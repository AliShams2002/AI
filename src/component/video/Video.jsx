import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

const Video = () => {

  const { sidebarIsOpen, setSidebarIsOpen } = useContext(MainContext);


    return (
        <div
        className={`${
          sidebarIsOpen
            ? "w-full lg:w-[calc(100%-250px)]"
            : "w-full lg:w-[calc(100%-64px)]"
        } absolute top-0 ${
          sidebarIsOpen ? "lg:left-[250px]" : "lg:left-[64px]"
        } h-screen flex items-center gap-5 bg-blue-300 transition-all duration-500 p-5 text-5xl text-white-100`}
      >
        Coming Soon!
      </div>
    );
}

export default Video;
