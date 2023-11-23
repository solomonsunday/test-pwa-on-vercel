import { IBaseCreateEditDate, IBaseCreatorEditorId, IBaseIsDelete, IBaseMongoId } from "@/common/base.interface";

export interface ITag extends IBaseMongoId, IBaseCreateEditDate, IBaseCreatorEditorId, IBaseIsDelete {
	name: string;
	slug: string
}
export interface CreateTagDto extends Readonly<Pick<ITag, 'name' | 'slug'>> { }
export interface UpdateTagDto extends CreateTagDto { }