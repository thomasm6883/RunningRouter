import React from "react";
import { GlobalContext } from "../App.jsx";
import StartRoute from "../StartRoute.jsx";

export default function GenerateRouteDrawer({ showGenerateRouteDrawer }, props) {
  const startLoc = props.startLoc
  const setStartLoc = props.setStartLoc
  const length = props.length
  const setLength = props.setLength
  const { setShowGenerateRouteDrawer, setShowBar, routesType, setShowModal, setModalContent } = React.useContext(GlobalContext);
  const onClose = () => {
    setShowGenerateRouteDrawer(false);
  };
  const routes = [
    {
      route: [
        {
          Lng: 40.748817,
          Lat: -73.985428,
        },
        {
          Lng: 41.748817,
          Lat: -74.985428,
        },
      ],
    }
      ]
  const handleGenerateRoutes = () => {
    setShowGenerateRouteDrawer(false);
    setShowBar(true);
    setRoutesType("Generated Routes");
    setRoutes(routes);
  }
  return (
    <div
      className={
        "fixed overflow-hidden z-10 w-full inset-x-0 top-0 h-fit    items-center content-center place-content-center flex justify-center" +
        (showGenerateRouteDrawer
          ? " transition-opacity opacity-100 duration-500 translate-y-0  "
          : " transition-all delay-500 opacity-0 -translate-y-full  ")
      }
    >
      <section
        className={
          " w-full bg-white w-full delay-400 duration-500 ease-in-out transition-all transform     self-center " +
          (showGenerateRouteDrawer ? " translate-y-0 " : " -translate-y-full ")
        }
      >
        <div className="relative w-full flex flex-col space-x-1 y-full">
          <div className="flex justify-left p-2">
          <header className="p-1 font-bold text-lg w-fit">Generate Route</header>
          <StartRoute startLoc = {startLoc} setStartLoc = {setStartLoc} setLength = {setLength} length = {length} setShowBar={setShowBar} routesType={routesType} setShowModal={setShowModal} setModalContent={setModalContent}/>
          </div>
          <div className="w-full flex justify-center">
          <button className="" onClick={() => onClose()}>
          <div className="w-24 h-2 bg-gray-300 rounded-full my-2"></div>
          </button>
          </div>

        </div>
      </section>
    </div>
  );
}
