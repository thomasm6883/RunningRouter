import React from "react";

export default function Drawer({ children, show, onClose, routesType }) {
  return (
    <div
      className={
        " fixed overflow-hidden z-10 inset-x-0 bottom-0 h-48" +
        (show
          ? " transition-opacity opacity-100 duration-500 translate-y-0  "
          : " transition-all delay-500 opacity-0 translate-y-full  ")
      }
    >
      <section
        className={
          " w-screen  bottom-0 absolute bg-white w-full delay-400 duration-500 ease-in-out transition-all transform  " +
          (show ? " translate-y-0 " : " translate-y-full ")
        }
      >
        <div className="relative w-screen flex flex-col space-x-1 y-full">
          <div className="flex justify-left p-2">
          <header className="p-1 font-bold text-lg">{routesType}</header>
            <button
              className="p-2 ml-auto justify-right"
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
          <div className="flex flex-row space-x-1 overflow-x-scroll">
          {children}
          </div>
        </div>
      </section>
    </div>
  );
}
