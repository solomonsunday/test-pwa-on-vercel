import {
  //   CheckBadgeIcon,
  Cog8ToothIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { IUser, IUserSettings } from "@/features/slices/user/userInterface";
import CoventiButton from "@/components/Button";
import {
  getProfile,
  updateProfileNotification,
} from "@/features/slices/user/userAction";
// import { ICountryCode } from "@/features/slices/utility/utilityInterface";
// import { getCountryCodes } from "@/features/slices/utility/utilityAction";
import { useAlert } from "@/contexts/ApplicationContext";
import Link from "next/link";
import classnames from "classnames";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/hooks";
import { getAuthData, saveAuthData } from "@/common/utility";
import {
  persistAuthentication,
  resendVerification,
  verifyAccount,
} from "@/features/slices/auth/authAction";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Image from "next/image";

type TabType = "settings" | "profile" | "verification" | "permissions";

export default function ProfileForm() {
  // https://github.com/viclafouch/mui-tel-input/blob/v3.1.1/src/shared/constants/countries.ts
  const { sendErrorAlert, sendAlert } = useAlert();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [profile, setProfile] = useState<IUser | null>(null);
  const { pathname, query } = useRouter();
  const dispatch = useAppDispatch();

  const profileForm = useForm<{
    firstName: string;
    surName: string;
    phoneNumber: string;
  }>();
  const verificationForm = useForm<{ token: string }>();

  useProtectedRoute();

  useEffect(() => {
    const tab = (query?.tab as TabType) || "profile";
    setActiveTab(tab);
  }, [query]);

  useEffect(() => {
    helpSetUserProfile();
    // helpSetCountryCodes();
  }, []);

  function onUpdateProfile(userDto: {
    firstName: string;
    surName: string;
    phoneNumber: string;
  }) {
    // 	// const { name, value } = event.target;
    // 	// setProfile((previousValue) => {
    // 	// 	return { ...previousValue!, [name]: value };
    // 	// });
  }

  function onUpdateNotification(event: React.ChangeEvent<HTMLInputElement>) {
    const payload = {
      [event.target.id]: event.target.checked,
    } as unknown as IUserSettings;
    setProfile((initialValue) => {
      if (!initialValue) return initialValue;
      const newSettings = Object.assign({}, initialValue.settings, {
        ...payload,
      });
      return { ...initialValue, settings: { ...newSettings } };
    });
    updateProfileNotification(payload)
      .then((message) => sendAlert(message))
      .catch((error) => sendErrorAlert(error));
  }

  function onSubmitVerification({ token }: { token: string }) {
    verifyAccount(token)
      .then((message) => {
        const authStore = getAuthData();
        if (authStore) {
          const authData = {
            ...authStore,
            user: { ...authStore.user, isVerified: true },
          };
          dispatch(persistAuthentication(authData));
          saveAuthData(authData);
        }
        setProfile((initialValue) => {
          if (!initialValue) return initialValue;
          return { ...initialValue, isVerified: true };
        });
        sendAlert(message);
      })
      .catch((error) => sendErrorAlert(error));
  }

  function onResendVerify() {
    resendVerification()
      .then((message) => sendAlert(message))
      .catch((error) => sendErrorAlert(error));
  }

  function helpSetUserProfile() {
    getProfile()
      .then((response) => setProfile(response.user))
      .catch((error) => sendErrorAlert(error));
  }

  // function helpSetCountryCodes() {
  // 	getCountryCodes()
  // 		.then(data => setCountryCodes(data.countryCodes))
  // 		.catch(error => sendErrorAlert(error));
  // }

  function isActiveRoute(route: TabType): boolean {
    return activeTab === route;
  }

  function renderProfile(): JSX.Element {
    return (
      <form onSubmit={profileForm.handleSubmit(onUpdateProfile)}>
        <div className="mb-5">
          <p className="mb-1 text-sm text-gray-400">Firstname</p>
          <input
            {...profileForm.register("firstName", {
              required: "Firstname is required",
              minLength: 2,
            })}
            type="text"
            autoComplete="false"
            value={profile?.firstName}
            className="w-full p-3 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
            required
            placeholder="Firstname..."
          />
          {profileForm.formState.errors.firstName?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {profileForm.formState.errors.firstName?.message}
            </p>
          )}
          {profileForm.formState.errors.firstName?.type === "minLength" && (
            <p className="mt-1 text-xs italic text-red-600">
              Minimum input length of 3
            </p>
          )}
        </div>

        <div className="mb-5">
          <p className="mb-1 text-sm text-gray-400">Surname</p>
          <input
            {...profileForm.register("surName", {
              required: "Surname is required",
              minLength: 2,
            })}
            type="text"
            autoComplete="false"
            value={profile?.surName}
            className="w-full p-3 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
            required
            placeholder="Surname..."
          />
          {profileForm.formState.errors.surName?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {profileForm.formState.errors.surName?.message}
            </p>
          )}
          {profileForm.formState.errors.surName?.type === "minLength" && (
            <p className="mt-1 text-xs italic text-red-600">
              Minimum input length of 3
            </p>
          )}
        </div>

        <div className="mb-6">
          <p className="mb-1 text-sm text-gray-400">Phonenumber</p>
          <input
            {...profileForm.register("phoneNumber")}
            type="text"
            autoComplete="false"
            value={profile?.contact?.phoneNumber}
            readOnly
            className="w-full p-3 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
            required
            placeholder="Phonenumber..."
          />
          {/* {profileForm.formState.errors.phoneNumber?.type === "required" && <p className="mt-1 text-xs italic text-red-600">{profileForm.formState.errors.phoneNumber?.message}</p>}
				{profileForm.formState.errors.phoneNumber?.type === "minLength" && <p className="mt-1 text-xs italic text-red-600">Minimum input length of 3</p>} */}
        </div>

        <CoventiButton
          type="submit"
          text="Submit"
          className="w-full"
          isDisabled={
            !verificationForm.formState.isDirty ||
            !verificationForm.formState.isValid
          }
        />
      </form>
    );
  }

  function renderSettings(): JSX.Element {
    return (
      <div className="w-full">
        <div className="mb-4">
          <p className="mb-1 text-gray-400">Email Notifications</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile?.settings?.acceptEmailNotification || false}
              id="acceptEmailNotification"
              onChange={onUpdateNotification}
              className="sr-only peer"
            />
            <div className="w-11 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-500">
              I will like to receive email notifications
            </span>
          </label>
        </div>

        <div>
          <p className="mb-1 text-gray-400">SMS Notifications</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile?.settings?.acceptSmsNotification || false}
              id="acceptSmsNotification"
              onChange={onUpdateNotification}
              className="sr-only peer"
            />
            <div className="w-11 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-500">
              {" "}
              I will like to receive SMS notifications
            </span>
          </label>
        </div>
      </div>
    );
  }

  function renderVerification(): JSX.Element {
    return (
      <form onSubmit={verificationForm.handleSubmit(onSubmitVerification)}>
        <div className="mb-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Verify account </span>
            {!profile?.isVerified && (
              <span
                onClick={() => onResendVerify()}
                className="text-sm cursor-pointer text-coventi hover:text-underline"
              >
                Resend Verification token
              </span>
            )}
          </div>
          <div className="flex items-center">
            <input
              {...verificationForm.register("token", {
                required: "Verification token is required",
                minLength: 6,
              })}
              type="number"
              disabled={profile?.isVerified}
              autoComplete="false"
              className="block w-full p-3 mt-1 placeholder-gray-400 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 disabled:bg-gray-200 disabled:border-slate-300 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50 focus:invalid:placeholder-red-700"
              required
              placeholder="Verification token..."
            />
          </div>
          {verificationForm.formState.errors.token?.type === "required" && (
            <p className="mt-1 text-xs italic text-red-600">
              {verificationForm.formState.errors.token?.message?.toString()}
            </p>
          )}
          {verificationForm.formState.errors.token?.type === "minLength" && (
            <p className="mt-1 text-xs italic text-red-600">
              Minimum input length of 3
            </p>
          )}
          {profile?.isVerified && (
            <small className="text-green-600">Account already verified!</small>
          )}
        </div>

        <CoventiButton
          type="submit"
          text="Submit"
          size="small"
          className="w-full"
          isDisabled={
            !verificationForm.formState.isDirty ||
            !verificationForm.formState.isValid ||
            profile?.isVerified
          }
        />
      </form>
    );
  }

  function renderPermissions() {
    return (
      <ul className="pl-4 list-disc">
        {profile &&
          profile.permissions.map((permission) => (
            <li key={Math.random()} className="normal-case">
              {permission}
            </li>
          ))}
      </ul>
    );
  }

  return (
    <div className="container mx-auto xs:px-6">
      <div className="mb-24 px">
        <div className="relative pt-30">
          <div className="bg-[#080055] rounded-lg w-auto h-[179px]" />
          <div className="absolute top-1/2 left-[5%]">
            <img
              className="inline-block h-[150px] w-[150px] rounded-full"
              src={`https://placehold.co/200x200/6083ff/white?text=${
                profile?.firstName.at(0)?.toUpperCase() || "."
              }${profile?.surName.at(0)?.toUpperCase() || ".."}`}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="container max-w-screen-lg mx-auto mb-20">
        <div className="flex mb-2">
          {!profile?.isVerified ? (
            <Image
              src={"/assets/images/unverified.svg"}
              alt="unverified-icon"
              width={150}
              height={50}
            />
          ) : (
            <Image
              src={"/assets/images/verified-icon.svg"}
              alt="verified-icon"
              width={130}
              height={30}
            />
          )}
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="border-r xs:col-span-12 md:col-span-3">
            <Link href={pathname}>
              <div
                className={classnames(
                  "grid grid-cols-10 gap-3 border-y border-l border-r-2 p-2 hover:text-coventi-500",
                  {
                    "text-coventi-500 border-r-coventi-500 cursor-default":
                      isActiveRoute("profile"),
                    "border-r-white hover:bg-blue-50 hover:border-r-blue-50":
                      !isActiveRoute("profile"),
                  }
                )}
              >
                <div className="col-span-2">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div className="flex items-center col-span-8">
                  <p>Profile </p>
                </div>
              </div>
            </Link>
            {/* <Link href={`${pathname}?tab=verification`}>
							<div
								className={classnames(
									"grid grid-cols-10 gap-3 border-b border-l border-r-2 p-2 hover:text-coventi-500",
									{
										"text-coventi-500 border-r-coventi-500 cursor-default": isActiveRoute('verification'),
										"border-r-white hover:bg-blue-50 hover:border-r-blue-50":
											!isActiveRoute('verification')
									}
								)}
							>
								<div className="col-span-2">
									<CheckBadgeIcon className="w-6 h-6" />
								</div>
								<div className="flex items-center col-span-8">
									<p>Verification</p>
								</div>
							</div>
						</Link> */}
            <Link href={`${pathname}?tab=settings`}>
              <div
                className={classnames(
                  "grid grid-cols-10 gap-3 border-b border-l border-r-2 p-2 hover:text-coventi-500",
                  {
                    "text-coventi-500 border-r-coventi-500 cursor-default":
                      isActiveRoute("settings"),
                    "border-r-white hover:bg-blue-50 hover:border-r-blue-50":
                      !isActiveRoute("settings"),
                  }
                )}
              >
                <div className="col-span-2">
                  <Cog8ToothIcon className="w-6 h-6" />
                </div>
                <div className="flex items-center col-span-8">
                  <p>Settings</p>
                </div>
              </div>
            </Link>
            {profile && profile?.userType === "admin" && (
              <Link href={`${pathname}?tab=permissions`}>
                <div
                  className={classnames(
                    "grid grid-cols-10 gap-3 border-b border-l border-r-2 p-2 hover:text-coventi-500",
                    {
                      "text-coventi-500 border-r-coventi-500 cursor-default":
                        isActiveRoute("permissions"),
                      "border-r-white hover:bg-blue-50 hover:border-r-blue-50":
                        !isActiveRoute("permissions"),
                    }
                  )}
                >
                  <div className="col-span-2">
                    <ShieldCheckIcon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center col-span-8">
                    <p>Permissions</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="xs:col-span-12 md:col-span-9">
            {activeTab === "profile" && renderProfile()}
            {activeTab === "settings" && renderSettings()}
            {activeTab === "verification" && renderVerification()}
            {activeTab === "permissions" &&
              profile?.userType === "admin" &&
              renderPermissions()}
          </div>
        </div>
      </div>
    </div>
  );
}
