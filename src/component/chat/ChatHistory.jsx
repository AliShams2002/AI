import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import Chat from "./Chat";
import swal from "sweetalert";
import logo from "../../assest/img/logo1.png";

const ChatHistory = () => {
  const { sidebarIsOpen, setSidebarIsOpen } = useContext(MainContext);
  const [historyIsOpen, setHistoryIsOpen] = useState(false);

  const [chats, setChats] = useState([]);
  const [mainChats, setMainChats] = useState([]);
  const [data, setData] = useState(null);

  const newChat = () => {
    setData([
      {
        text: "سلام! چطور می‌توانم به شما کمک کنم?",
        sender: "bot",
        botId: `YEKTA AI${Math.floor(Math.random() * (1000 - 0 + 1)) + 0}`,
      },
    ]);
  };

  const handelRemoveChat = (item) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this chat?",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const itemIndex = chats.findIndex((i) => i[0].botId == item);
        chats.splice(itemIndex, 1);
        localStorage.setItem("chats", JSON.stringify(chats));
        newChat();
        swal("The deletion operation was successful!", {
          icon: "success",
        });
      } else {
        swal("You have canceled the deletion of this chat!");
      }
    });
  };

  useEffect(() => {
    newChat();
    const savedChats = localStorage.getItem("chats");
    if (savedChats) {
      setChats(JSON.parse(savedChats));
      setMainChats(JSON.parse(savedChats));
    } else {
      return;
    }
  }, [localStorage.getItem("chats")]);

  return (
    <>
      <div
        className={`${
          sidebarIsOpen
            ? "w-full lg:w-[calc(100%-250px)]"
            : "w-full lg:w-[calc(100%-64px)]"
        } absolute top-0 ${
          sidebarIsOpen ? "lg:left-[250px]" : "lg:left-[64px]"
        } h-screen flex items-center gap-5 bg-blue-300 transition-all duration-500 px-1 md:p-5`}
      >
        <section
          className={`fixed xl:relative xl:top-0 xl:right-0 ${
            historyIsOpen ? "top-28" : "-top-[800px]"
          }  bg-blue-300 xl:bg-transparent right-10 z-40 flex max-w-[300px] w-full max-h-[450px] h-full xl:h-full  items-center flex-col gap-5 p-2 transition-all duration-500 rounded-md`}
        >
          <button
            className={`${
              historyIsOpen ? "top-[570px]" : "top-4"
            } xl:hidden text-2xl right-44 text-white-100 fixed  p-3 bg-blue-300 rounded-full transition-all duration-500`}
          >
            <i
              class={`${historyIsOpen ? 'ri-close-large-line' : 'ri-message-2-line'}`}
              onClick={() => setHistoryIsOpen(!historyIsOpen)}
            ></i>
          </button>
          <div className="w-full flex items-center gap-2 bg-transparent py-2 px-4 bg-[#1d1748] rounded-md">
            <i class="ri-search-line text-white-100 transition-all duration-500"></i>
            <input
              className="focus:outline-none w-full bg-transparent text-white-100 transition-all duration-500"
              type="search"
              placeholder="search..."
            />
          </div>
          <ul
            id="chat"
            className="w-full max-h-[600px] overflow-y-auto overflow-hidden flex items-center gap-3 flex-col"
          >
            {mainChats.length > 0 ? (
              chats.map((i) => (
                <>
                  <li
                    className="cursor-pointer w-full flex gap-1"
                    onClick={() => setData(i)}
                    key={i[0].botId}
                  >
                    <input
                      className="hidden peer"
                      type="radio"
                      name="chat"
                      value={i[0].botId}
                      id={i[0].botId}
                    />
                    <label
                      htmlFor={i[0].botId}
                      className="w-full flex items-center gap-2 capitalize bg-blue-200 text-white-100 peer-checked:bg-blue-100 transition-all duration-500 p-4 rounded-md"
                    >
                      <img src={logo} alt="" className="w-10 h-10" />
                      <div className="flex items-center flex-col gap-1">
                        <span className="font-semibold">{i[0].botId}</span>
                        <p className="max-w-40 text-ellipsis overflow-hidden text-nowrap text-white-400">
                          {i[i.length - 1].text}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm">
                          {i[i.length - 1].timestamp}
                        </span>
                        <button>
                          <i
                            class="ri-delete-bin-line text-2xl text-white-100"
                            onClick={() => handelRemoveChat(i[0].botId)}
                          ></i>
                        </button>
                      </div>
                    </label>
                  </li>
                </>
              ))
            ) : (
              <span className="text-white-100 transition-all duration-500">
                Your chat history is empty!
              </span>
            )}
          </ul>

          <button
            className="w-full p-4 rounded-md font-medium bg-blue-100 text-white-100"
            onClick={() => newChat()}
          >
            New Chat
          </button>
        </section>
        {data ? <Chat data={data} /> : null}
      </div>
    </>
  );
};

export default ChatHistory;
