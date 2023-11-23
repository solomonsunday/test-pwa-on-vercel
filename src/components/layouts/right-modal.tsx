import Image from "next/image";

const paymentDetail = [
  {
    date: "16/05/2023",
    pastEvent: "Burna boy at ...",
    payment: 50,
  },
  {
    date: "20/05/2023",
    pastEvent: "2face idibia in la ...",
    payment: 150,
  },
  {
    date: "16/05/2023",
    pastEvent: "Davido in Osun ...",
    payment: 150,
  },
];

const RightModal = ({
  paymentContent,
  value,
}: {
  paymentContent: any;
  value?: any;
}) => {
  return (
    <div className="fixed right-0 z-50 h-screen px-8 transition-all duration-500 bg-white shadow-lg w-96">
      {paymentContent && (
        <>
          <div className="flex items-center px-0 py-4 space-x-3">
            <div className="p-4 bg-blue-300 rounded-full">
              <p> AO</p>
            </div>
            <div>
              <p className="text-lg font-bold"> Alexandra Okoro</p>
              <p> Alexandra.okoro@gmail.com</p>
            </div>
          </div>
          <hr className="mt-2 border-slate-200" />
          {paymentDetail.length > 0 ? (
            <div className="pb-32 mt-10 overflow-auto rounded-">
              <table className="w-full">
                <thead className="border-b border-b-gray-400 borer">
                  <tr className="">
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                      Date & Time
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Past Events
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paymentDetail &&
                    paymentDetail.length > 0 &&
                    paymentDetail.map((item) => {
                      return (
                        <tr className="">
                          <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                            {item.date}
                          </td>
                          <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                            {" "}
                            {item.pastEvent}
                          </td>
                          <td className="p-2 text-sm text-gray-700 whitespace-nowrap">
                            {item.payment}{" "}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {paymentDetail.length === 0 && (
                <div className="flex items-center justify-center w-full my-36">
                  <div className="flex flex-col items-center justify-center px-auto">
                    <div className="">
                      <img src="/assets/images/user.svg" alt="user" />
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-lg font-semibold">
                        No payment made yet
                      </p>
                      <p>
                        Your user's payment will apear here when they have one
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full my-60">
              <div className="flex flex-col items-center justify-center px-auto">
                <div className="">
                  <Image
                    src="/assets/images/user.svg"
                    width={120}
                    height={0}
                    alt="user"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p className="text-lg font-semibold">
                    This user currently has no payments or past events
                  </p>
                  <p className="text-sm text-slate-400">
                    Payments or past events will appear here when they make a
                    purchase
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RightModal;
