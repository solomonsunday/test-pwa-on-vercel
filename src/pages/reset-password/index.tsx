// import { registerUser } from "@/features/slices/auth/authAction";
// import { UserRegisterDto } from "@/features/slices/auth/authInterface";
// import { useAppDispatch } from "@/store/hooks";
import React, { FC, useEffect } from "react";

const ResetPassword: FC = (): JSX.Element => {
  //   const dispatch = useAppDispatch();
  //   const [userRegisterDetail] = useState<UserRegisterDto>();
  // userRegisterDetail
  //   const handleUserRegistration = () => {
  //     dispatch(registerUser());
  //   };

  useEffect(() => {
    // handleUserRegistration();
  }, []);

  return (
    <div className="p-4 mx-auto bg-white container-md">
      <div className="grid h-screen grid-cols-7 gap-4">
        <div className="pt-8 xs:col-span-7 sm:col-span-7 md:col-span-3 md:px-16">
          <img
            className="w-auto h-8 mb-12"
            src="https://coventi.co/wp-content/uploads/2023/01/BLUE-coventi-logo-1.png"
            alt="coventi_logo"
          />
          <h4 className="mb-2 text-3xl font-bold">Welcome to Coventi!</h4>
          <p className="mb-10 font-light text-slate-500 text-md">
            How would you like to sign up?
          </p>
          <form>
            <div className="block mb-4">
              <span className="block text-sm text-slate-500">Password</span>
              <input
                type="password"
                className="block w-full p-3 mt-1 bg-white border rounded-lg border-slate-400 placeholder-slate-500 focus:outline-none focus:border-indigo-300 disabled:bg-slate-100 disabled:text-slate-500 disabled:shadow-none focus:invalid:border-red-500 focus:invalid:bg-red-50"
                required
                minLength={6}
                placeholder="Password..."
              />
              <p className="mt-1 text-xs text-center text-red-600">
                Input cannot be empty!
              </p>
              <p className="mt-1 text-xs text-center text-red-600">
                Please provide a valid email address.
              </p>
            </div>

            <button className="w-full p-3 my-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-700">
              Submit
            </button>
          </form>

          <div className="grid grid-cols-5 mb-2">
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

          <button className="w-full p-3 mt-4 mb-10 border rounded-lg bg-white-500 border-slate-400 hover:bg-slate-100 text-gray">
            <div className="grid grid-cols-12">
              <div className="col-span-1">
                <img
                  className="h-6"
                  src="https://img.icons8.com/office/2x/google-logo.png"
                  alt=""
                />
              </div>
              <div className="col-span-11">
                <p>Continue with Google</p>
              </div>
            </div>

            {/* <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
						<div className="shrink-0">
							<CheckCircleIcon className="w-8 h-8 text-green-500" />
						</div>
						<span>Continue with Google</span> */}
          </button>

          <p className="font-light text-center text-slate-500 text-md">
            Already have an account?{" "}
            <span>
              <a className="font-normal text-indigo-500" href="http://">
                Sign in
              </a>{" "}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center col-span-4 xs:hidden">
          <img
            className="h-[40rem]"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
            alt="coventi_event_banner"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
