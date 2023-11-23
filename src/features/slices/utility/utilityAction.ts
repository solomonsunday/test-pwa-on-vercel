import { ITimezone, } from "./utilityInterface";
import { UtilityService } from "@/features/services";
import { getCountryRawCodes } from "@/common/base.constant";

export async function getTimezones() {
	const response = await UtilityService.getTimeZones<{
		timezones: ITimezone[];
	}>();
	return response.data.timezones;
}

export async function getPermissions(): Promise<string[]> {
	const response = await UtilityService.getPermissions<{
		permissions: string[];
	}>();
	return response.data.permissions;
}

export function getCountryCodes() {
	return getCountryRawCodes();
}

export async function getAzureSignedUrl(fileName: string) {
	const response = await UtilityService.getAzureSignedUrl<{
		preSignedUrl: string;
	}>(fileName);
	return response.data;
}

export async function uploadFileToAzureBlob(url: string, file: File) {
	return UtilityService.uploadFileToAzureBlob({
		url,
		headers: { 'x-ms-blob-type': 'BlockBlob' },
		// 'x-ms-version': '2020-04-08'
		method: 'put',
		data: file
	});
}
