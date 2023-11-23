import { TagService } from "@/features/services";
import { CreateTagDto, ITag, UpdateTagDto } from "./tagInterface";

export async function createTag(createTagDto: CreateTagDto) {
	const response = await TagService.createTag(createTagDto);
	return { message: response.message };
}

export async function getTags() {
	const response = await TagService.getTags<{
		tags: ITag[],
		totalTags: number
	}>();
	return response.data.tags;
}

export async function updateTag({ tagId, updateTagDto }: {
	tagId: string;
	updateTagDto: UpdateTagDto;
}) {
	const response = await TagService.updateTag<{ message: string }>({
		tagId,
		updateTagDto
	});
	return response.data.message;
}

export async function deleteTag(tagId: string) {
	return TagService.deleteTag(tagId);
}
