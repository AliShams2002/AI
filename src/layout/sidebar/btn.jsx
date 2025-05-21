import React from "react";

const Btn = (props) => {

    const {sidebarIsOpen, title, icon} = props;

  return (
    <button class="text-lg font-medium w-full flex items-center gap-3 cursor-pointer hover:bg-blue-100 transition-all duration-500 p-2 rounded-md">
      <i class={`${icon} text-2xl`}></i>
      <span
        className={`${
          sidebarIsOpen ? "opacity-100" : "opacity-0"
        } transition-all duration-500`}
      >
        {title}
      </span>
    </button>
  );
};

export default Btn;
