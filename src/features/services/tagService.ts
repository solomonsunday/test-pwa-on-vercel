import { CreateTagDto, UpdateTagDto } from "../slices/tag/tagInterface";
import { deleteFunc, getFunc, patchFunc, postFunc } from "./common/request";


export async function createTag<TResponse>(createTagDto: CreateTagDto) {
	return postFunc<TResponse>({ path: "/tag/admin/create", payload: createTagDto });
}

export async function getTags<TResponse>() {
	return getFunc<TResponse>({ path: '/tag/admin/get' });
}

export async function getOneTag<TResponse>() {
	return getFunc<TResponse>({ path: '/tag/admin/get' });
}

export async function updateTag<TResponse>({ tagId, updateTagDto }: {
	tagId: string;
	updateTagDto: UpdateTagDto;
}) {
	return patchFunc<TResponse>({
		path: `/tag/admin/update/${tagId}`,
		payload: updateTagDto
	});
}

export async function deleteTag(tagId: string) {
	return deleteFunc({ path: `/tag/admin/delete/${tagId}` });
}
