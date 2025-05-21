import React from "react";
import Sidebar from "../layout/sidebar/Sidebar";
import SidebarMainContext from "../context/MainContext";
import { Route, Routes } from "react-router";
import ChatHistory from "./chat/ChatHistory";
import Video from "./video/Video";
import FileUploader from "./document/FileUploader";

const Content = () => {
  return (
    <SidebarMainContext>
      <Sidebar/>
      <Routes>
        <Route path="/chat" element= {<ChatHistory/>} />
        <Route path="/video" element= {<Video/>} />
        <Route path="/document" element= {<FileUploader/>} />
        <Route path="*" element= {<ChatHistory/>} />
      </Routes>
    </SidebarMainContext>
  );
};

export default Content;
