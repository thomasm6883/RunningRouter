import React from "react";

export default function RouteBar({ show, onClose, length }) {

  return (
    <div
      className={
        " fixed overflow-hidden z-10 inset-x-0 bottom-0 h-fit w-full items-center content-center place-content-center flex justify-center" +
        (show
          ? " transition-opacity opacity-100 duration-500 translate-y-0"
          : " transition-all delay-500 opacity-0 translate-y-full  ")
      }
    >
      <section
        className={
          "bg-white w-full lg:w-3/4 lg:max-w-3/4 delay-400 duration-500 ease-in-out transition-all transform self-center lg:rounded-t-xl" +
          (show ? " translate-y-0 " : " translate-y-full ")
        }
      >
        <div className="relative  flex flex-col space-x-1 y-full">
          <div className="flex justify-left p-2">
            <div className="w-full flex flex-row justify-around">
            <div>Elapsed Miles: {Number(length).toFixed(1)}</div>
            <div>Miles: {Number(length).toFixed(1)}</div>
            <div>Elapsed Time: {Number(length).toFixed(1) * 15}</div>
            <div>Calories Burnt: {Number(length).toFixed(1) * 100}</div>
            </div>
            <button
              className="p-2 ml-auto justify-right rounded-full border-2 border-black"
              onClick={() => onClose()}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
