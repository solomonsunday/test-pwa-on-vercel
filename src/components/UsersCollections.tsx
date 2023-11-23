import React from "react";

const UsersCollections = ({
  usersImages,
  users,
}: {
  usersImages: any;
  users?: string | number;
}): JSX.Element => {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {usersImages.map((item: any) => (
          <div key={item.id}>
            <img
              className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
              src={item.src}
              alt=""
            />
          </div>
        ))}
      </div>
      {/* <p className="ml-4 text-xs font-light">25k are watching</p> */}
      <p className="ml-4 text-xs font-light">{users}</p>
    </div>
  );
};

export default UsersCollections;
