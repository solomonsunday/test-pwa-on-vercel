interface AuthBannerProps {
  title: string;
  subText: string;
}

function AuthBanner({ title, subText }: AuthBannerProps): JSX.Element {
  return (
    <div
      style={{
        backgroundImage: `url(/assets/images/auth-banner.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full mb-4 rounded-3xl"
    >
      <div className="flex flex-col justify-end w-full h-full p-8">
        <h1 className="max-w-md text-4xl text-white">{title}</h1>
        <p className="max-w-md text-base text-white mt-7">{subText}</p>
        <div className="flex mt-8 ">
          <span className="w-8 h-1 mr-2 bg-white rounded-sm"></span>
          <span className="w-3 h-1 mr-2 bg-white rounded-sm"></span>
          <span className="w-3 h-1 bg-white rounded-sm"></span>
        </div>
      </div>
    </div>
  );
}

export default AuthBanner;
