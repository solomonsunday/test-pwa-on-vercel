import {
	IBaseMongoId,
	IBaseCreateEditDate,
	IBaseCreatorEditorId,
	IBaseIsDelete,
	IBaseReferenceId,
} from "@/common/base.interface";
import { ITag } from "../tag/tagInterface";

export interface IEvent
	extends IBaseMongoId,
	IBaseCreateEditDate,
	IBaseCreatorEditorId,
	IBaseIsDelete,
	IBaseReferenceId {
	name: string;
	media: {
		display: string;
		cover: string;
	};
	schedules: ISchedule[];
	amount: number;
	amountUsd: number;
	sponsors: string[];
	tags: ITag[];
	status: EventStatusType;
	type: EventType;
	thirdPartyStreamLink: string;
	streamId: string;
	streamData: IApiVideoLiveStream;
	summary: string;
	description: string;
}

export interface ISchedule extends IBaseMongoId {
	scheduleId: string;
	name: string;
	dateTime: string;
	location: string;
	isEnded?: boolean;
	timeZone: string;
}

export interface IApiVideoLiveStream {
	liveStreamId: string;
	name: string;
	streamKey: string;
	record: boolean;
	_public: boolean;
	assets?: {
		hls: string;
		iframe: string;
		player: string;
		thumbnail: string;
	};
	playerId: string;
	broadcasting: boolean;
	createdAt: string;
	updatedAt: string;
	// readonly discriminator: string;
	// readonly attributeTypeMap: Array<AttributeType>;
	// getAttributeTypeMap(): Array<AttributeType>
}

export enum EventStatusEnum {
	LIVE = "live",
	UPCOMING = "upcoming",
	PAST = "past",
}

export enum EventTypeEnum {
	LIVE_STREAM = "live-stream",
	ON_DEMAND = "on-demand",
	THIRD_PARTY = "third-party",
}

export type EventType = `${EventTypeEnum}`; // converts to type
export type EventStatusType = `${EventStatusEnum}`; // converts to type

export interface CreateEventDto {
	readonly name: string;
	readonly coverImage: File;
	readonly displayImage: File;
	readonly schedules: ISchedule[];
	readonly sponsors: string[];
	readonly tags: string[];
	amount: number;
	amountUsd: number;
	readonly type: EventType;
	readonly thirdPartyStreamLink: string;
	readonly pricingType: EventPricingType;
	readonly summary: string;
	readonly description: string;
}
export enum EventPricingTypeEnum {
	FREE = 'free',
	PAID = 'paid'
};
export type EventPricingType = `${EventPricingTypeEnum}`; // converts to type

export enum ImageTypeEnum {
	DISPLAY_IMAGE = 'displayImage',
	COVER_IMAGE = 'coverImage'
};
export type ImageType = `${ImageTypeEnum}`; // converts to type


export interface UpdateEventDto extends CreateEventDto { }
// export interface UpdateEventDto extends CreateEventDto { }
