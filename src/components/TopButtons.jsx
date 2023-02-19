import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Delhi",
    },
    {
      id: 2,
      title: "Bangalore",
    },
    {
      id: 3,
      title: "Kolkata",
    },
    {
      id: 4,
      title: "Sydney",
    },
    {
      id: 5,
      title: "London",
    },
  ];

  return (
    <div className="flex justify-evenly items-center my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => setQuery({ q: city.title })}
          className=" text-white font-medium text-lg transition ease-out hover:-translate-y-1"
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
