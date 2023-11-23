import { useState, useEffect } from 'react';

import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from "react-select/animated";

import { useAlert } from '@/contexts/ApplicationContext';
import { IUser, UserTypeEnum } from '@/features/slices/user/userInterface'
import { getPermissions } from '@/features/slices/utility/utilityAction';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import Avatar from '../Avatar'
import { updateUserPermissions } from '@/features/slices/user/userAction';

const animatedComponents = makeAnimated();

export default function UserPermissionForm({ user, returnAction }: {
	user: IUser | null;
	returnAction: () => void;
}) {
	const { sendAlert, sendErrorAlert } = useAlert();
	const [permissions, setPermissions] = useState<string[]>([]);
	const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

	const {
		handleSubmit,
		register,
		watch,
		setValue,
		// setError,
		// clearErrors,
		// formState: { },
	} = useForm<Pick<IUser, '_id' | 'userType' | 'permissions'>>();

	const userTypeWatch = watch('userType');

	useEffect(() => {
		setValue('userType', user!.userType);
		helpSetUserPermissions(user ? user.permissions : []);
		helpGetPermissions();
	}, []);

	function helpGetPermissions() {
		getPermissions()
			.then((response) => setPermissions(response))
			.catch((error) => sendErrorAlert(error));
	}

	function onSubmitPermissions(permissionDto: Pick<IUser, '_id' | 'userType' | 'permissions'>) {
		permissionDto._id = user?._id;
		if (permissionDto.userType === UserTypeEnum.USER) {
			permissionDto.permissions = [];
		}

		updateUserPermissions(permissionDto)
			.then(message => {
				sendAlert(message);
				returnAction();
			})
			.catch((error) => sendErrorAlert(error));
	}

	function helpSetUserPermissions(data: string[]) {
		setSelectedPermissions(data);
		setValue('permissions', data);
	}

	return (
		<div className='py-3'>
			<div className='flex items-center gap-3 p-2 mb-6 border border-gray-300 rounded-lg'>
				<Avatar user={user!} />
				<div>
					<p className='capitalize'>{user?.firstName} {user?.surName}</p>
					<p className='text-xs text-gray-500'>{user?.contact?.email}</p>
				</div>
			</div>


			<form onSubmit={handleSubmit(onSubmitPermissions)}>
				<span className='text-xs text-gray-400'>User type</span>
				<div className='grid grid-cols-12 gap-4 mt-1 mb-6'>
					<div className='col-span-6'>
						<input
							{...register('userType', { required: 'User type is required' })}
							type='radio'
							id={UserTypeEnum.USER}
							value={UserTypeEnum.USER}
							className='w-5 h-5'
							hidden
						/>
						<label
							htmlFor={UserTypeEnum.USER}
							className={classnames(
								'block w-full px-4 py-1 rounded-lg focus:outline-none border',
								{
									'text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white':
										userTypeWatch !== UserTypeEnum.USER,
									'text-coventi border-white ring-2 ring-coventi-500':
										userTypeWatch === UserTypeEnum.USER
								}
							)}
						>
							<div className='flex items-center justify-between'>
								<p className='capitalize'>{UserTypeEnum.USER}</p>
								{userTypeWatch === UserTypeEnum.USER && (
									<p>
										<CheckBadgeIcon className='w-4 h-4' />
									</p>
								)}
							</div>
						</label>
					</div>

					<div className='col-span-6'>
						<input
							{...register('userType', { required: 'Event type is required' })}
							type='radio'
							id={UserTypeEnum.ADMIN}
							value={UserTypeEnum.ADMIN}
							className='w-5 h-5'
							hidden
						/>
						<label
							htmlFor={UserTypeEnum.ADMIN}
							className={classnames(
								'block w-full px-4 py-1 rounded-lg focus:outline-none border',
								{
									'text-gray-500 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow cursor-pointer ring-2 ring-white':
										userTypeWatch !== UserTypeEnum.ADMIN,
									'text-coventi border-white ring-2 ring-coventi-500':
										userTypeWatch === UserTypeEnum.ADMIN,
								}
							)}>
							<div className='flex items-center justify-between'>
								<p className='capitalize'>{UserTypeEnum.ADMIN}</p>
								{userTypeWatch === UserTypeEnum.ADMIN && <p>
									<CheckBadgeIcon className='w-4 h-4' />
								</p>}
							</div>
						</label>
					</div>
				</div>
				<div className='flex justify-between text-xs mb-1'>
					<span className='text-gray-400'>Permissions</span>
					<span className='text-coventi'>{selectedPermissions.length} of {permissions.length}</span>
				</div>
				<CreatableSelect
					isMulti={true}
					className="w-full mb-6"
					instanceId="permissions"
					placeholder="Select permissions"
					hideSelectedOptions={true}
					minMenuHeight={10}
					closeMenuOnSelect={false}
					components={animatedComponents}
					isDisabled={userTypeWatch !== UserTypeEnum.ADMIN}
					value={selectedPermissions.map(
						permission => {
							return {
								label: permission,
								value: permission
							}
						})}
					theme={{
						borderRadius: 10,
						spacing: {
							baseUnit: 6.3,
							menuGutter: 4
						},
					} as any
					}
					options={permissions.map(
						permission => { return { label: permission, value: permission } })
					}
					onChange={permissionss => {
						const filteredPermissions = permissionss.map(tags => tags.value);
						setSelectedPermissions(filteredPermissions);
						setValue('permissions', filteredPermissions);
					}}
				/>

				{/* {permissions.map(permission => <label key={Math.random()} className='flex border border-blue-400 p-2 gap-3 rounded-lg mt-1'>
					<input id={permission} value={permission} type='checkbox' className='accent-coventi-500' onChange={onSelectPermission} />
					<span className='capitalize'>{helpFormatText(permission)}</span>
				</label>)} */}

				<button
					type="submit"
					className="w-full rounded-full text-base py-2 bg-coventi-500 hover:bg-blue-600 active:bg-blue-700 text-white disabled:shadow-none disabled:bg-blue-300"
				>					Submit				</button>
			</form>
		</div>
	)
}
