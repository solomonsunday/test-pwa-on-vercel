import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";

import ModalLayout from "@/components/layouts/ModalLayout";
import CoventiButton from "@/components/Button";
import { useForm } from "react-hook-form";
import {
  persistAuthentication,
  resendVerification,
  verifyAccount,
} from "@/features/slices/auth/authAction";
import { getAuthData, saveAuthData } from "@/common/utility";
import { useAlert, useVerification } from "@/contexts/ApplicationContext";
import { Spinner } from "@/components/Reusable";

function VerificationModal(): JSX.Element {
  const dispatch = useAppDispatch();

  const [statusModalIsOpen, setStatusModalIsOpen] = useState(true);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const { toggleVerificationModal } = useVerification();

  const { sendErrorAlert, sendAlert } = useAlert();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ token: any }>();

  const onSubmit = ({ token }: { token: any }) => {
    console.log(token);
    setBtnLoading(true);
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
          setBtnLoading(false);
          toggleVerificationModal();
        }

        setBtnLoading(false);
        sendAlert(message);
        toggleVerificationModal();
      })
      .catch((error) => sendErrorAlert(error));
  };

  function onResendVerify() {
    resendVerification()
      .then((message) => sendAlert(message))
      .catch((error) => sendErrorAlert(error));
  }

  return (
    <>
      <ModalLayout
        parameters={{
          isOpened: statusModalIsOpen,
          title: "Verify Account",
        }}
        modalResult={() => {
          setStatusModalIsOpen(false);
          toggleVerificationModal();
        }}
      >
        <>
          <div className="mb-6 space-y-3">
            <div className="text-center text-blue-800">
              Kindly enter the verification token sent to your email
            </div>
            <form className="mb-6 space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="token" className="text-sm text-gray-400 ">
                Verification Token
              </label>

              <div className="xs:col-span-12 sm:col-span-4">
                <input
                  {...register("token", {
                    required: true,
                    minLength: 6,
                  })}
                  type="number"
                  // placeholder="Verification token..."
                  className="w-full p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none "
                />
              </div>
              <div
                className="font-bold text-right text-blue-800 cursor-pointer"
                onClick={onResendVerify}
              >
                {" "}
                Resend Verification Code
              </div>
              {errors.token?.type === "required" && (
                <p className="mt-1 text-xs italic text-red-600">
                  Verification token is required
                </p>
              )}
              <CoventiButton
                text={
                  btnLoading ? <Spinner width={20} height={20} /> : "Submit"
                }
                type="submit"
                className="w-full"
                size="small"
              />
            </form>
          </div>
        </>
      </ModalLayout>
    </>
  );
}

export default VerificationModal;
