import React, { useState } from "react";

export const PeopleCard = ({
  dp,
  name,
  work,
  price,
  mainphoto,
  description,
  contact,
  domain,
  setActivePerson,
  userid,
}) => {
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setActivePerson({
        dp,
        name,
        work,
        price,
        mainphoto,
        description,
        contact,
        domain,
        userid,
      });
    }, 0);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setActivePerson(null);
  };

  return (
    <div
      className="group w-1/5 bg-white border-black border rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
      onClick={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-white ">
        <img
          src={mainphoto}
          alt="Profile Work"
          className="object-contain w-4/5 mx-auto py-5"
          style={{ width: "250px", height: "300px" }}
        />
      </div>
      <hr className="border-black border-2 mx-10 rounded-lg" />
      <div className="p-4">
        <div className="flex gap-2 items-center">
          <img
            src={dp}
            alt="Profile"
            className="w-1/6 h-1/6 object-contain rounded-full"
            style={{ width: "40px", height: "40px" }}
          />
          <h3 className="text-l font-bold text-black">{name}</h3>
        </div>

        <p className="text-black text-sm mt-2">{work}</p>
        <p className="text-black text-sm mt-1 font-semibold">
          Domain: {domain[0].toUpperCase() + domain.slice(1)}
        </p>
        <p className="text-black text-base font-semibold ">
          Price : APT {price}
        </p>
      </div>
    </div>
  );
};
