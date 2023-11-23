import { IAuthenticatedUser } from "@/features/slices/auth/authInterface";
import { IEvent } from "@/features/slices/event/eventInterface";
import { IUser } from "@/features/slices/user/userInterface";
import { nanoid } from "@reduxjs/toolkit";

/** This  takes object as parameter, removes the property that is `undefined`, `null`, or `' '`.
 *
 * Returns an array unchanged
 *
 * Note: It doesnt work for nested object yet
 */
export function sanitizeObject<TData extends object>(
	data: TData,
	keysToRemove: string[] = []
): TData {
	if (!(data && typeof data === "object")) return data;
	if (Array.isArray(data)) return data;
	keysToRemove.forEach((element) => {
		if (data.hasOwnProperty(element)) {
			delete (data as any)[element];
		}
	});
	for (let property in data) {
		if (
			data[property] === null ||
			data[property] === undefined ||
			(data[property] as any) === "undefined" ||
			(data[property] as any) === ""
		) {
			delete data[property];
		}
	}
	return data;
}

export function transformNullObjectValues<TData extends object>(
	data: TData,
	to: string | null | undefined
): TData {
	if (!(data && typeof data === "object")) return data;
	if (Array.isArray(data)) return data;
	for (let property in data) {
		if (
			data[property] === null ||
			data[property] === undefined ||
			(data[property] as any) === "undefined" ||
			(data[property] as any) === ""
		) {
			data[property] = to as any;
		}
	}
	return data;
}

export function isValidEmail(email: string): boolean {
	const regX = new RegExp("[^@]+@[^@]+.[a-zA-Z]{2,6}");
	return regX.test(email);
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
	const phoneNumRegex = /^[+]?[0-9]*(?:[0-9]*)$/;
	return phoneNumRegex.test(phoneNumber);
}

export function getUserTimeZone(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function toTitleCase(text: string | undefined): string {
	if (!text || text === null || text === "") {
		return "";
	}
	return text.replace(/^./, text[0].toUpperCase());
}

export function parsePricing(event: IEvent | null): string {
	if (!event) return ' ';
	const timeZone = getUserTimeZone();
	if (timeZone !== 'Africa/Lagos') {
		return `$ ${event.amountUsd}`;
	}
	return `₦ ${event.amount}`;
}

export function getAuthData() {
	const rawUser = window.localStorage.getItem("user")!;
	const token = window.localStorage.getItem("token")!;
	if (!token && !rawUser) {
		return null;
	}
	const user = JSON.parse(rawUser);
	return { token, user } as IAuthenticatedUser;
}

export function saveAuthData({
	token,
	user,
}: {
	token?: string;
	user?: Partial<IUser>;
}): void {
	if (token) {
		window.localStorage.setItem("token", token);
	}
	if (user) {
		window.localStorage.setItem("user", JSON.stringify(user));
	}
}

export function deleteAuthData() {
	window.localStorage.removeItem("user")!;
	window.localStorage.removeItem("token")!;
}
export function getInitials(data: string): string {
	if (!data || data === null || data === "") {
		return "";
	}
	const converted = data.match(/\b(\w)/g);
	return converted?.join("").toUpperCase() || "";
}

export function generateNanoId(size = 15): string {
	return nanoid(size).toLowerCase();
}

export function matchAdminPermissions({
	requiredPermissions,
	userPermissions,
	matchAll = false,
}: {
	requiredPermissions: string[];
	userPermissions: string[];
	matchAll?: boolean;
}): boolean {
	let isPermitted = false;
	if (!userPermissions.length || !requiredPermissions.length) {
		return false;
	}
	if (matchAll) {
		isPermitted = requiredPermissions.every((item) =>
			userPermissions.includes(item)
		);
	}
	if (!matchAll) {
		isPermitted = requiredPermissions.some((item) =>
			userPermissions.includes(item)
		);
	}
	return isPermitted;
}

export function getScreenSize(): "mobile" | "tablet" | "desktop" {
	const width = window.innerWidth;
	if (width < 767) return 'mobile';
	if (width > 767 && width < 1024) return 'tablet';
	return 'desktop';
}

export function GenerateReadableDate({
	date,
}: { date?: string | number | Date } = {}) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let { year, month, day, weekDay, hour, minute, seconds } = rawDateObject({
		date,
	});
	const monthIndex = +month.charAt(0) === 0 ? +month.charAt(1) : +month;
	month = months[monthIndex - 1];
	weekDay = days.at(+weekDay.slice(1))!;
	const time = `${hour}:${minute}:${seconds}`;
	return `${weekDay}, ${day} ${month}, ${year}. ${time}`;
}

function rawDateObject({ date }: { date?: string | number | Date } = {}): {
	year: string;
	month: string;
	day: string;
	weekDay: string;
	hour: string;
	minute: string;
	seconds: string;
	milliseconds: string;
} {
	// https://stackoverflow.com/questions/5510580/convert-string-to-datetime
	// https://stackoverflow.com/questions/63383340/angular-date-pipe-takes-into-account-timezone
	const now = rawDate({ date });
	const year = now.getFullYear().toString();
	const month = padStart({
		value: now.getMonth() + 1,
		maxLength: 2,
		fillingValue: 0,
	});
	const day = padStart({ value: now.getDate(), maxLength: 2, fillingValue: 0 });
	const weekDay = padStart({
		value: now.getDay(),
		maxLength: 2,
		fillingValue: 0,
	});
	const hour = padStart({
		value: now.getHours(),
		maxLength: 2,
		fillingValue: 0,
	});
	const minute = padStart({
		value: now.getMinutes(),
		maxLength: 2,
		fillingValue: 0,
	});
	const seconds = padStart({
		value: now.getSeconds(),
		maxLength: 2,
		fillingValue: 0,
	});
	const milliseconds = padStart({
		value: now.getMilliseconds(),
		maxLength: 3,
		fillingValue: 0,
	});
	return { year, month, day, weekDay, hour, minute, seconds, milliseconds };
}

export function formatDate(date: any) {
	var hours = date.getHours();
	let minutes = date.getMinutes();
	var ampm = hours >= 12 ? "pm" : "am";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes;
	var strTime = hours + ":" + minutes + " " + ampm;
	return (
		date.getMonth() +
		1 +
		"/" +
		date.getDate() +
		"/" +
		date.getFullYear() +
		" " +
		strTime
	);
}

function rawDate({ date }: { date?: string | number | Date } = {}): Date {
	return date ? new Date(date) : new Date();
}
function padStart({
	value,
	maxLength,
	fillingValue,
}: {
	value: string | number;
	maxLength: number;
	fillingValue: string | number;
}): string {
	const val01 = `${value}`.padStart(maxLength, `${fillingValue}`.toString());
	return val01.toString().trim();
}
