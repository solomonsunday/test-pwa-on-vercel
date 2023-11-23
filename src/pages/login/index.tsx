import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import { NextSeo } from "next-seo";
import { GoogleLogin } from "@react-oauth/google";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AuthBanner from "@/components/AuthBanner";
import { userLogin } from "@/features/slices/auth/authAction";
import { UserLoginDto } from "@/features/slices/auth/authInterface";
import { UserTypeEnum } from "@/features/slices/user/userInterface";
import { useAlert } from "@/contexts/ApplicationContext";
import { Spinner } from "@/components/Reusable";

export default function Login(): JSX.Element {
  const {
    handleSubmit,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors, isDirty, isValid },
  } = useForm<UserLoginDto>();

  const userAuth = useAppSelector((state) => state?.auth);
  const dispatch = useAppDispatch();
  const [isProceeded, setIsProceeded] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  // const router = useRouter();
  const { sendErrorAlert, sendAlert } = useAlert();

  const emailvalue = watch("email");
  const isBusy = userAuth.loading;

  useEffect(() => {
    if (userAuth) {
      helpRouteAuthUser();
    }
  }, [userAuth]);

  const proceed = () => {
    if (!emailvalue) {
      setError(
        "email",
        { types: { required: "Enter an email to continue" } },
        { shouldFocus: true }
      );
      return;
    }
    clearErrors("email");
    setIsProceeded(!isProceeded);
  };

  const onSubmit: SubmitHandler<UserLoginDto> = (value) => {
    dispatch(userLogin(value));
    if (!userAuth.data || !userAuth.data.user) {
      return;
    }
  };

  function helpRouteAuthUser() {
    if (userAuth.error) {
      sendErrorAlert(userAuth.error);
    }
    if (!userAuth.data || !userAuth.data.user) {
      return;
    }
    if (userAuth.success) {
      console.log(Router.query, "query-list");
      const redirectPath = (Router.query.redirect_url as string) || null;
      if (userAuth.data.user?.userType === UserTypeEnum.ADMIN) {
        sendAlert("Login successful");
        Router.push("/admin/dashboard");
        return;
      }
      let url = "/dashboard";
      if (redirectPath) {
        url = redirectPath;
      }
      Router.push(url);
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <NextSeo
        title="Login - Coventi"
        description="Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!"
        openGraph={{
          url: "https://coventi.co/login",
          title: "Login - Coventi",
          description:
            "Monetise and maximise your concerts to a larger audience with Cutting-Edge Technology for the best Livestreaming performances and high-quality video content delivery!",
        }}
      />

      <div className="w-full bg-white ">
        <div className="container p-4 mx-auto">
          {/* <div className="flex flex-col md:flex-row md:space-x-24">
  <div className="flex flex-col space-y-3 md:px-16 md:w-2/5"> */}
          <div className="grid grid-cols-7 gap-4 h-scrseen">
            <div className="pt-8 xs:col-span-7 sm:col-span-7 lg:col-span-3 md:px-16">
              <Link href="/">
                <div className="mb-12">
                  <Image
                    src="/assets/images/app-logo.svg"
                    alt="appicon"
                    width={127}
                    height={0}
                  />
                </div>
              </Link>
              <h3 className="text-3xl font-bold md:text-3xl space-y-60">
                Sign in to continue
              </h3>

              {!isProceeded ? (
                <p className="pt-2 pb-7">How would you like to proceed</p>
              ) : (
                <p className="pb-7">Enter your login details to proceed</p>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pb-5">
                  <label className="pb-10 color-slate-100">Email address</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                    className={`${
                      errors.email ? "border-red-500" : ""
                    }focus:invalid:border-red-500 focus:outline-none focus:border-blue-300 w-full  p-3 py-3 bg-transparent border border-gray-300 rounded-lg`}
                  />
                  {errors?.email && (
                    <p className="py-1 text-red-500 border-l ">
                      Email is required
                    </p>
                  )}
                </div>
                {isProceeded && (
                  <div className="block">
                    <label className="pb-10 color-slate-100">Password</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <input
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        {...register("password", {
                          required: true,
                          minLength: 6,
                        })}
                        className={`${
                          errors.password ? "border-red-500" : ""
                        } focus:invalid:border-red-500 focus:outline-none focus:border-blue-300 w-full p-3 py-3 bg-transparent `}
                      />

                      <div
                        className="inset-y-0 flex items-center px-4 text-gray-600 cursor-pointer "
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {errors?.password && (
                      <p className="py-1 text-red-500 border-l ">
                        Password is required
                      </p>
                    )}
                    <p className="flex flex-row justify-end mt-3 text-indigo-700 hover:text-indigo-600 hover:cursor-pointer">
                      <Link href="/forgot-password">Forgot Password?</Link>
                    </p>
                  </div>
                )}
                {!isProceeded ? (
                  <div className="w-full pb-5 mt-3 space-y-10">
                    <button
                      onClick={proceed}
                      disabled={!isDirty || !isValid}
                      className="w-full p-5 py-3 text-white text-center delay-150 transform bg-indigo-500 shadow-lg rounded-full active:translate-y-0.5 hover:bg-bule-600 disabled:bg-blue-300"
                    >
                      Proceed with Email
                    </button>
                  </div>
                ) : (
                  <div className="pb-5 mt-3 space-y-10">
                    <button
                      disabled={isBusy}
                      type="submit"
                      className="w-full p-5 py-3 text-white delay-150 transform bg-indigo-500 shadow-lg rounded-full active:translate-y-0.5 hover:bg-indigo-600"
                    >
                      {isBusy ? <Spinner height={20} width={20} /> : "Sign in"}
                    </button>
                    {/* <ReuseableButton>Sign In</ReuseableButton> */}
                  </div>
                )}
              </form>

              <div className="grid grid-cols-5 mb-6">
                <div className="col-span-2 divide-y divide-slate-300">
                  <div className="mt-3"></div>
                  <div></div>
                </div>
                <div className="text-center">Or</div>
                <div className="col-span-2 divide-y divide-slate-300">
                  <div className="mt-3"></div>
                  <div></div>
                </div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  width={360}
                  text="signin_with"
                  shape="pill"
                  context="signin"
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>

              {/* {!isProceeded && (
								<div className="flex flex-col space-y-6">
									<button className="w-full p-3 border border-gray-300 rounded-full hover:border-blue-300 hover:bg-blue-50 active:bg-blue-100 text-gray hover:text-blue-400">
										<div className="grid grid-cols-12">
											<div className="col-span-1">
												<Image
													//   loader={myLoader}
													src="/assets/images/twitter.svg"
													alt="twitetr"
													width={25}
													height={25}
												/>
											</div>
											<div className="col-span-11">
												<p className="mt-1">Continue with Twitter</p>
											</div>
										</div>
									</button>

									<button className="w-full p-3 border border-gray-300 rounded-full hover:border-blue-300 hover:bg-blue-50 active:bg-blue-100 text-gray hover:text-blue-400">
										<div className="grid grid-cols-12">
											<div className="col-span-1">
												<Image
													//   loader={myLoader}
													src="/assets/images/instagram.svg"
													alt="instagram"
													width={25}
													height={25}
												/>
											</div>
											<div className="col-span-11">
												<p className="mt-1">Continue with Instagram</p>
											</div>
										</div>
									</button>

									<button className="w-full p-3 border border-gray-300 rounded-full hover:border-blue-300 hover:bg-blue-50 active:bg-blue-100 text-gray hover:text-blue-400">
										<div className="grid grid-cols-12">
											<div className="col-span-1">
												<Image
													//   loader={myLoader}
													src="/assets/images/linkedin.svg"
													alt="linkedin"
													width={25}
													height={25}
												/>
											</div>
											<div className="col-span-11">
												<p className="mt-1">
													Continue with linkedin
													<span className="invisible text-white">......</span>
												</p>
											</div>
										</div>
									</button>
								</div>
							)} */}

              <div className="pt-10 text-center left-72 bottom-20 ">
                <p className="text-center">
                  Dont have an account?
                  <span className="text-indigo-500 hover:text-indigo-900 hover:cursor-pointer">
                    {" "}
                    <Link href="/register">Sign up</Link>
                  </span>
                </p>
              </div>
            </div>
            {/* image section */}
            {/* <div className="hidden pt-6 md:block"> */}
            <div className="flex justify-center min-h-screen py-6 sm:col-span-7 lg:col-span-4 xs:hidden">
              {/* Image tag */}
              <AuthBanner
                title="Get Up Close and Personal"
                subText="Unlock Limitless Livestreaming with Coventi"
              />
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
