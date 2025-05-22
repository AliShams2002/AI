import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import logo from "../../assest/img/logo.png";
import { NavLink } from "react-router";
import Btn from "./btn";

const Sidebar = () => {
  const { sidebarIsOpen, setSidebarIsOpen } = useContext(MainContext);

  return (
    <div
      class={`${
        sidebarIsOpen ? "w-[250px] left-0" : "w-16 -left-16"
      } h-screen fixed z-40 top-0 lg:left-0 flex gap-2 bg-blue-200 text-white transform transition-all duration-500`}
    >
      <button
        className={`lg:hidden fixed ${
          sidebarIsOpen ? "left-52 top-6" : "left-[70px] top-3"
        } z-50  text-white-100 flex justify-start font-semibold transition-all duration-500`}
      >
        <i
          class={`ri-menu-2-line text-2xl ${sidebarIsOpen ? "rotate-180" : "rotate-0"} transition-all duration-500`}
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
        ></i>
      </button>
      <div class="h-full flex flex-col gap-4 items-start px-2 py-4 w-full overflow-hidden">
        <div
          className={`relative flex items-center transition-all duration-500 ${
            sidebarIsOpen ? "mb-0" : "mb-8"
          }`}
        >
          <img src={logo} alt="" className="w-10 h-12" />
          <span
            className={`${
              sidebarIsOpen ? "opacity-100" : "opacity-0"
            } font-bold transition-all duration-500 text-xl`}
          >
            YEKTA&nbsp;AI
          </span>
          <button
            className={`hidden lg:flex text-2xl font-medium absolute transition-all duration-500 ${
              sidebarIsOpen
                ? "translate-x-48 translate-y-0 rotate-180"
                : "translate-x-2 translate-y-12"
            }`}
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          >
            <i class="ri-arrow-right-s-line"></i>
          </button>
        </div>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 w-full rounded-md text-white-100"
              : "bg-transparent w-full text-white-300"
          }
          to="/chat"
        >
          <Btn
            sidebarIsOpen={sidebarIsOpen}
            title="CHAT"
            icon="ri-wechat-line"
          />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 w-full rounded-md text-white-100"
              : "bg-transparent w-full text-white-300"
          }
          to="/video"
        >
          <Btn
            sidebarIsOpen={sidebarIsOpen}
            title="VIDEO"
            icon="ri-movie-2-line"
          />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 w-full rounded-md text-white-100"
              : "bg-transparent w-full text-white-300"
          }
          to="/document"
        >
          <Btn
            sidebarIsOpen={sidebarIsOpen}
            title="DOCUMENT"
            icon="ri-file-pdf-2-line"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
