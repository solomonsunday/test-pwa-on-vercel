"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import classnames from "classnames";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import makeAnimated from "react-select/animated";
import { useAlert } from "@/contexts/ApplicationContext";

import { createEvent, getOneEvent } from "@/features/slices/event/eventAction";
import {
	CreateEventDto,
	EventPricingTypeEnum,
	EventTypeEnum,
	IEvent,
	ImageType,
	ImageTypeEnum,
} from "@/features/slices/event/eventInterface";
import { createTag, getTags } from "@/features/slices/tag/tagAction";
import { CreateTagDto, ITag } from "@/features/slices/tag/tagInterface";
import ScheduleForm from "./ScheduleForm";
import { generateNanoId, toTitleCase } from "@/common/utility";
import RichTextEditor from "../RichTextEditor";
import CoventiButton from "../Button";
import {
	getAzureSignedUrl,
	uploadFileToAzureBlob,
} from "@/features/slices/utility/utilityAction";

const animatedComponents = makeAnimated();

export default function EventForm() {
	const { sendAlert, sendErrorAlert } = useAlert();
	const router = useRouter();
	const eventId = (router.query?.eventId as string)?.toLowerCase() || null;
	const [tags, setTags] = useState<ITag[]>([]);
	const [event, setEvent] = useState<IEvent | null>(null);
	const [pickedCoverImage, setPickedCoverImage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [pickedDisplayImage, setPickedDisplayImage] = useState<string | null>(
		null
	);

	const {
		handleSubmit,
		register,
		// setError,
		setValue,
		watch,
		// getValues,
		formState: { errors, isValid },
	} = useForm<CreateEventDto>({
		mode: "onChange",
		defaultValues: {
			tags: [],
			sponsors: [],
			schedules: [],
		},
	});
	// const priceTypeWatch = watch('pricingType');
	const eventTypeWatch = watch("type");
	// const watchImages = watch([ImageTypeEnum.COVER_IMAGE, ImageTypeEnum.DISPLAY_IMAGE]);

	useEffect(() => {
		helpGetEvent();
		helpSetTags();
	}, [eventId]);

	function onSelectCoverImage() {
		const coverImageRef = document.getElementById(
			ImageTypeEnum.COVER_IMAGE
		) as HTMLInputElement;
		if (!coverImageRef) {
			return;
		}
		coverImageRef.click();
	}

	function onSelectDisplayImage() {
		const displayImageRef = document.getElementById(
			ImageTypeEnum.DISPLAY_IMAGE
		) as HTMLInputElement;
		if (!displayImageRef) {
			return;
		}
		displayImageRef.click();
	}

	async function handlePickedImage(event: any) {
		try {
			const pickedImage = (event.target as HTMLInputElement).files?.item(0);
			const pickedImageId = event.target.id as ImageType;
			if (!pickedImage || !pickedImageId) {
				sendAlert("No image picked!", "error");
				return;
			}
			sendAlert("Uploading image!", "info");
			const imageName = `${generateNanoId(20)}.${pickedImage.type
				.split("/")
				.at(length - 1)}`;
			const { preSignedUrl } = await getAzureSignedUrl(imageName);
			const blobUploadResult = await uploadFileToAzureBlob(
				preSignedUrl,
				pickedImage
			);
			sendAlert("Image upload successful!");

			if (blobUploadResult.isSuccess) {
				if (pickedImageId === ImageTypeEnum.COVER_IMAGE) {
					setPickedCoverImage(blobUploadResult.url);
					return;
				}
				setPickedDisplayImage(blobUploadResult.url);

				const fileReader = new FileReader();
				fileReader.onload = () => {
					setValue(pickedImageId, pickedImage, {
						shouldDirty: true,
						shouldTouch: true,
						shouldValidate: true,
					});
				};
				fileReader.readAsDataURL(pickedImage);
			}
		} catch (error) {
			sendErrorAlert(error);
		}
	}

	function onSubmitEvent(createEventDto: CreateEventDto) {
		setIsLoading(true);
		if (createEventDto.pricingType === EventPricingTypeEnum.FREE) {
			createEventDto.amount = 0;
		}
		const eventObj = {
			...createEventDto,
			amount:
				createEventDto.pricingType !== EventPricingTypeEnum.FREE
					? createEventDto.amount
					: 0,
			coverImage: pickedCoverImage,
			displayImage: pickedDisplayImage,
		};
		createEvent(eventObj as unknown as CreateEventDto)
			.then((response) => {
				router.push("/admin/events");
				sendAlert(response.message);
				setIsLoading(true);
			})
			.catch((error) => {
				sendErrorAlert(error);
				setIsLoading(false);
			});
	}

	function helpCreateTag(value: string) {
		const newTag: CreateTagDto = {
			name: value,
			slug: value.split(" ").join("-"),
		};
		createTag(newTag)
			.then((response) => {
				sendAlert(response.message);
				helpSetTags();
			})
			.catch((error) => sendErrorAlert(error));
	}

	function helpSetTags() {
		getTags()
			.then((tags) => setTags(tags))
			.catch((error) => sendErrorAlert(error));
	}

	function helpGetEvent() {
		if (eventId) {
			getOneEvent({ eventId })
				.then((event) => {
					if (event) {
						setEvent(event);
						helpSetEventToForm(event);
					}
				})
				.catch((error) => sendErrorAlert(error));
		}
	}

	function helpSetEventToForm(event: IEvent) {
		setValue("name", event.name, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setValue("description", event.description, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setValue("summary", event?.summary, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setValue("type", event.type, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setValue("amount", event.amount, {
			shouldDirty: true,
			shouldValidate: true,
		});
		setValue(
			"pricingType",
			event.amount === 0
				? EventPricingTypeEnum.FREE
				: EventPricingTypeEnum.PAID,
			{
				shouldDirty: true,
				shouldValidate: true,
			}
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmitEvent)}>
			<div className="mb-6">
				<span className="text-sm text-gray-400">Name</span>
				<div className="flex items-center">
					<input
						{...register("name", {
							required: "Event name is required",
							minLength: 5,
						})}
						type="text"
						autoComplete="false"
						className="w-full px-4 py-3 mt-1 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
						placeholder="Event name..."
					/>
					{isValid && (
						<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
					)}
				</div>

				{errors.name?.type === "required" && (
					<p className="mt-1 text-xs text-red-500">{errors.name?.message}</p>
				)}
				{errors.name?.type === "minLength" && (
					<p className="mt-1 text-xs text-red-500">Minimum input length of 5</p>
				)}
			</div>

			<div className="mb-6">
				<span className="text-sm text-gray-400">Media</span>
				<div className="grid grid-cols-12 gap-4 mt-1">
					<div
						onClick={onSelectCoverImage}
						className="cursor-pointer xs:col-span-12 md:col-span-6"
					>
						{!pickedCoverImage && (
							<div
								className={classnames(
									"w-full text-center rounded-lg py-6 px-4 border-dashed border-[1.5px]",
									{
										"border-blue-300 bg-blue-50/50 hover:bg-blue-50/75 active:bg-blue-100":
											!errors.coverImage,
										"border-red-400 bg-red-50/50 hover:bg-red-50/75 active:bg-red-100":
											errors.coverImage,
									}
								)}
							>
								<div className="flex justify-center mb-3">
									<ArrowUpTrayIcon
										className={classnames("h-8 w-8", {
											"text-blue-500": !errors.coverImage,
											"text-red-500": errors.coverImage,
										})}
									/>
								</div>
								<p className="mb-3 text-black">Cover image</p>
								<p className="font-thin text-black">Click to upload file</p>
							</div>
						)}

						{pickedCoverImage && (
							<Image
								className="mb-4 rounded-lg"
								src={pickedCoverImage}
								alt={"event_img"}
								width={1500}
								height={1500 / 2}
							/>
						)}

						<input
							{...register(ImageTypeEnum.COVER_IMAGE, {
								required: "Event cover image is required",
							})}
							onChange={(event) => handlePickedImage(event)}
							id={ImageTypeEnum.COVER_IMAGE}
							type="file"
							accept="image/*"
							hidden
						/>
						{errors.coverImage?.type === "required" && (
							<p className="mt-1 text-xs text-red-500">
								{errors.coverImage?.message}
							</p>
						)}
					</div>

					<div
						onClick={onSelectDisplayImage}
						className="cursor-pointer xs:col-span-12 md:col-span-6"
					>
						<input
							{...register(ImageTypeEnum.DISPLAY_IMAGE, {
								required: "Event display image is required",
							})}
							onChange={(event) => handlePickedImage(event)}
							id={ImageTypeEnum.DISPLAY_IMAGE}
							type="file"
							accept="image/*"
							hidden
						/>

						{!pickedDisplayImage && (
							<div
								className={classnames(
									"w-full text-center rounded-lg py-6 px-4 border-dashed border-[1.5px]",
									{
										"border-blue-300 bg-blue-50/50 hover:bg-blue-50/75 active:bg-blue-100":
											!errors.displayImage,
										"border-red-400 bg-red-50/50 hover:bg-red-50/75 active:bg-red-100":
											errors.displayImage,
									}
								)}
							>
								<div className="flex justify-center mb-3">
									<ArrowUpTrayIcon
										className={classnames("h-8 w-8", {
											"text-blue-500": !errors.displayImage,
											"text-red-500": errors.displayImage,
										})}
									/>
								</div>
								<p className="mb-3 text-black">Display image</p>
								<p className="font-thin text-black">Click to upload file</p>
							</div>
						)}

						{pickedDisplayImage && (
							<Image
								className="mb-4 rounded-lg"
								src={pickedDisplayImage}
								alt={"event_img"}
								width={1500}
								height={1500 / 2}
							/>
						)}

						{errors.displayImage?.type === "required" && (
							<p className="mt-1 text-xs text-red-500">
								{errors.displayImage?.message}
							</p>
						)}
					</div>
				</div>
			</div>

			<div className="mb-6">
				<span className="text-sm text-gray-400">Summary</span>
				<textarea 	{...register("summary", {
					required: "Event summary is required",
					minLength: 5,
				})}
					autoComplete="false" rows={4}
					className="w-full px-4 py-3 mt-1 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
					placeholder="Event summary..." />

				{errors.summary?.type === "required" && (
					<p className="mt-1 text-xs text-red-500">{errors.summary?.message}</p>
				)}
				{errors.summary?.type === "minLength" && (
					<p className="mt-1 text-xs text-red-500">Minimum input length of 5</p>
				)}
			</div>

			<div className="mb-6">
				<span className="text-sm text-gray-400">Description</span>
				<RichTextEditor
					emitContent={(content) => {
						setValue("description", content, {
							shouldTouch: true,
							shouldValidate: true,
							shouldDirty: true,
						});
					}}
				// content={event ? event.description : ''}
				/>
				<input
					{...register("description", {
						required: "Description are required!",
					})}
					hidden
				/>
				{errors.description?.type === "required" && (
					<p className="mt-1 text-xs text-red-500">
						{errors.description?.message}
					</p>
				)}
			</div>

			<div className="mb-6">
				<ScheduleForm
					emitSchedules={(schedules) => {
						setValue("schedules", schedules, {
							shouldTouch: true,
							shouldValidate: true,
							shouldDirty: true,
						});
					}}
					initialSchedules={event ? event.schedules : []}
				/>
				<input
					{...register("schedules", {
						required: "Must create at least one schedule!",
					})}
					hidden
				/>
				{errors.schedules?.type === "required" && (
					<p className="mt-1 text-xs text-red-500">
						{errors.schedules?.message}
					</p>
				)}
			</div>

			<div className="mb-6">
				<span className="text-sm text-gray-400">Event type</span>
				<div className="grid grid-cols-12 gap-2 mt-1">
					<div className="xs:col-span-12 sm:col-span-4">
						<input
							{...register("type", { required: "Event type is required" })}
							type="radio"
							id={EventTypeEnum.LIVE_STREAM}
							value={EventTypeEnum.LIVE_STREAM}
							className="w-5 h-5"
							hidden
						/>
						<label
							htmlFor={EventTypeEnum.LIVE_STREAM}
							className={classnames(
								"block w-full px-4 py-1 rounded-full focus:outline-none border",
								{
									"text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white":
										eventTypeWatch !== EventTypeEnum.LIVE_STREAM,
									"text-coventi border-white ring-2 ring-coventi-500":
										eventTypeWatch === EventTypeEnum.LIVE_STREAM,
								}
							)}
						>
							<div className="flex items-center justify-between">
								<p>Live stream</p>
								{eventTypeWatch === EventTypeEnum.LIVE_STREAM && (
									<p>
										<CheckBadgeIcon className="w-4 h-4" />
									</p>
								)}
							</div>
						</label>
					</div>

					<div className="xs:col-span-12 sm:col-span-4">
						<input
							{...register("type", { required: "Event type is required" })}
							type="radio"
							id={EventTypeEnum.ON_DEMAND}
							value={EventTypeEnum.ON_DEMAND}
							className="w-5 h-5"
							hidden
						/>
						<label
							htmlFor={EventTypeEnum.ON_DEMAND}
							className={classnames(
								"block w-full px-4 py-1 rounded-full focus:outline-none border",
								{
									"text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white":
										eventTypeWatch !== EventTypeEnum.ON_DEMAND,
									"text-coventi border-white ring-2 ring-coventi-500":
										eventTypeWatch === EventTypeEnum.ON_DEMAND,
								}
							)}
						>
							<div className="flex items-center justify-between">
								<p>On-demand video</p>
								{eventTypeWatch === EventTypeEnum.ON_DEMAND && (
									<p>
										<CheckBadgeIcon className="w-4 h-4" />
									</p>
								)}
							</div>
						</label>
					</div>

					<div className="xs:col-span-12 sm:col-span-4">
						<input
							{...register("type", { required: "Event type is required" })}
							type="radio"
							id={EventTypeEnum.THIRD_PARTY}
							value={EventTypeEnum.THIRD_PARTY}
							className="w-5 h-5"
							hidden
						/>
						<label
							htmlFor={EventTypeEnum.THIRD_PARTY}
							className={classnames(
								"block w-full px-4 py-1 rounded-full focus:outline-none border",
								{
									"text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white":
										eventTypeWatch !== EventTypeEnum.THIRD_PARTY,
									"text-coventi border-white ring-2 ring-coventi-500":
										eventTypeWatch === EventTypeEnum.THIRD_PARTY,
								}
							)}
						>
							<div className="flex items-center justify-between">
								<p>Third party e.g zoom</p>
								{eventTypeWatch === EventTypeEnum.THIRD_PARTY && (
									<p>
										<CheckBadgeIcon className="w-4 h-4" />
									</p>
								)}
							</div>
						</label>
					</div>
				</div>

				{errors.type?.type === "required" && (
					<p className="mt-1 text-xs text-red-500">{errors.type?.message}</p>
				)}
			</div>

			{eventTypeWatch === EventTypeEnum.THIRD_PARTY && (
				<div className="mb-6">
					<span className="text-sm text-gray-400">Third-party stream URL</span>
					<div className="flex items-center">
						<input
							{...register("thirdPartyStreamLink", {
								required: "Third-party stream URL is required",
								// pattern: '',
								minLength: 5,
							})}
							type="url"
							autoComplete="false"
							className="w-full px-4 py-3 mt-1 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
							placeholder="Third-party stream URL..."
						/>
						{isValid && (
							<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
						)}
					</div>

					{errors.thirdPartyStreamLink?.type === "required" && (
						<p className="mt-1 text-xs text-red-500">
							{errors.thirdPartyStreamLink?.message}
						</p>
					)}
					{errors.thirdPartyStreamLink?.type === "pattern" && (
						<p className="mt-1 text-xs text-red-500">URL format only!</p>
					)}
				</div>
			)}

			<div className="grid grid-cols-12 gap-4 mb-6">
				<div className="xs:col-span-12 sm:col-span-6">
					<div>
						<span className="text-sm text-gray-400">Event price in Naira</span>
						<div className="flex items-center">
							<input
								{...register("amount", {
									required: "Amount Naira is required",
									// value: priceTypeWatch === EventPricingTypeEnum.FREE ? 0 : undefined
								})}
								type="number"
								autoComplete="false"
								className="w-full px-4 py-3 mt-1 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 read-only:bg-blue-100 "
								placeholder="Event price in Naira..."
							/>
							{isValid && (
								<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
							)}
						</div>

						{errors.amount?.type === "required" && (
							<p className="mt-1 text-xs text-red-500">
								{errors.amount?.message}
							</p>
						)}
					</div>
				</div>
				<div className="xs:col-span-12 sm:col-span-6">
					<div>
						<span className="text-sm text-gray-400">Event price in USD</span>
						<div className="flex items-center">
							<input
								{...register("amountUsd", {
									required: "Amount USD is required",
									// value: priceTypeWatch === EventPricingTypeEnum.FREE ? 0 : undefined
								})}
								type="number"
								autoComplete="false"
								className="w-full px-4 py-3 mt-1 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700 read-only:bg-blue-100 "
								placeholder="Event price in USD..."
							/>
							{isValid && (
								<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
							)}
						</div>

						{errors.amount?.type === "required" && (
							<p className="mt-1 text-xs text-red-500">
								{errors.amount?.message}
							</p>
						)}
					</div>
				</div>
				<div className="col-span-6">
					<div>
						<span className="text-sm text-gray-400">Pricing type</span>
						<div className="flex items-center gap-8 px-3 mt-4">
							<div className="flex items-center gap-2">
								<input
									{...register("pricingType", {
										required: "Price type is required",
									})}
									type="radio"
									id={EventPricingTypeEnum.PAID}
									autoComplete="false"
									value={EventPricingTypeEnum.PAID}
									className="w-5 h-5 accent-coventi-500"
								// placeholder="Event name..."
								/>
								<label htmlFor={EventPricingTypeEnum.PAID} className="text-xs">
									{EventPricingTypeEnum.PAID}
								</label>
							</div>

							<div className="flex items-center gap-2">
								<input
									{...register("pricingType", {
										required: "Price type is required",
									})}
									type="radio"
									id={EventPricingTypeEnum.FREE}
									autoComplete="false"
									value={EventPricingTypeEnum.FREE}
									className="w-5 h-5 accent-coventi-500"
								// placeholder="Event name..."
								/>
								<label htmlFor={EventPricingTypeEnum.FREE} className="text-xs">
									{EventPricingTypeEnum.FREE}
								</label>
							</div>
						</div>

						{errors.pricingType?.type === "required" && (
							<p className="mt-4 text-xs text-red-500">
								{errors.pricingType?.message}
							</p>
						)}
					</div>
				</div>
			</div>

			<div className="mb-6">
				<span className="text-sm text-gray-400">Tags</span>
				<div className="flex items-center mt-1">
					<CreatableSelect
						isMulti
						className="w-full"
						instanceId="tags"
						placeholder="Selects tags"
						hideSelectedOptions={true}
						minMenuHeight={10}
						closeMenuOnSelect={false}
						components={animatedComponents}
						theme={
							{
								borderRadius: 8,
								spacing: {
									// controlHeight: 4,
									baseUnit: 6.3,
									menuGutter: 4,
								},
							} as any
						}
						onCreateOption={(value) => {
							value = value.trim().toLowerCase();
							helpCreateTag(value);
						}}
						onChange={(selectedTags) => {
							const tagsValue = selectedTags.map(
								(tags: any) => tags.value as string
							);
							setValue("tags", tagsValue, {
								shouldDirty: true,
								shouldTouch: true,
								shouldValidate: true,
							});
						}}
						options={tags.map((tag) => ({
							label: toTitleCase(tag.name),
							value: tag._id,
						}))}
					/>
					{!isValid && (
						<CheckCircleIcon className="w-6 h-6 mt-1 text-green-500 -ml-9" />
					)}
				</div>
				<input
					{...register("tags", { required: "Tags are required!" })}
					hidden
				/>
				{errors.tags?.type === "required" && (
					<p className="mt-1 text-xs text-red-500">{errors.tags?.message}</p>
				)}
			</div>

			<div className="mb-12">
				<span className="text-sm text-gray-400">Sponsors</span>
				<div className="flex items-center mt-1">
					<CreatableSelect
						isMulti
						className="w-full"
						instanceId="tags"
						placeholder="Selects sponsors"
						theme={
							{
								// colors:{}
								borderRadius: 8,
								spacing: {
									// controlHeight: 4,
									baseUnit: 6.3,
									menuGutter: 4,
								},
							} as any
						}
					// options={tags.map(
					// 	tag =>
					// 	({
					// 		label: tag.name,
					// 		value: tag.slug
					// 	})
					// )}
					/>
					{isValid && (
						<CheckCircleIcon className="h-6 mt-1 text-green-500 -ml-9" />
					)}
				</div>
				{/* <input {...register("sponsors", {
					// required: "Sponsors are required!"
				})} hidden /> */}
				{errors.sponsors?.type === "required" && (
					<p className="mt-1 text-xs text-red-500">
						{errors.sponsors?.message}
					</p>
				)}
			</div>

			<CoventiButton
				type="submit"
				text="Submit"
				isBusy={isLoading}
				// isDisabled={!isDirty || !isValid}
				className="w-full px-8"
			/>
		</form>
	);
}
