import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import logo from "../../assest/img/logo1.png";
import TypingIndicator from "./TypingIndicator";

const Chat = ({ data }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [language, setLanguage] = useState("fa");
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // بارگیری تاریخچه چت از localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    const savedChats = localStorage.getItem("chats");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          text: "سلام! چطور می‌توانم به شما کمک کنم?",
          sender: "bot",
          botId: `YEKTA AI${Math.floor(Math.random() * (1000 - 0 + 1)) + 0}`,
        },
      ]);
    }
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    } else {
      return;
    }
    setMessages(data);
  }, [data]);

  // ذخیره تاریخچه چت در localStorage
  useEffect(() => {
    if (messages.length > 0) {
      handelChats(messages[0]);
    }
    if (messages.length > 1) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
      localStorage.setItem("chats", JSON.stringify(chats));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handelChats = (item) => {
    if (has(item.botId)) {
      const chatIndex = chats.findIndex((i) => i[0].botId == item.botId);
      chats[chatIndex] = messages;
    } else {
      chats.push(messages);
    }
  };

  const findItem = (id) => {
    if (chats) {
      return chats.find((item) => item[0].botId === id);
    } else {
      return;
    }
  };

  const has = (id) => {
    return !!findItem(id);
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !file) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      file: file ? URL.createObjectURL(file) : null,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFile(null);
    setIsTyping(true);

    // پاسخ هوشمند از API
    try {
      const botResponse = await fetchChatBotResponse(input, language);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const fetchChatBotResponse = async (message, lang) => {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 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",
            "HTTP-Referer": "https://www.sitename.com",
            "X-Title": "SiteName",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [{ role: "user", content: input }],
          }),
        }
      );
      const data = await response.json();
      const markdownText =
        data.choices?.[0]?.message?.content || "No response received.";
      return markdownText;
    } catch (error) {
      console.error("Error:", error);
      return "Sorry, I encountered an error. Please try again.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const renderFilePreview = () => {
    if (!file) return null;

    if (file.type.startsWith("image/")) {
      return (
        <div className="mt-2">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="max-w-xs max-h-32 rounded"
          />
        </div>
      );
    }

    return (
      <div className="mt-2 p-2 bg-gray-100 rounded">
        <p>فایل: {file.name}</p>
      </div>
    );
  };

  return (
    <>
      <section className="w-full h-full flex items-center flex-col gap-2">
        {messages.length > 0 ? (
          <>
            <div className="w-full flex items-center justify-between p-7">
              <div className="flex gap-2 items-center">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                <span className="text-xl font-medium text-white-100 transition-all duration-500">
                  {messages[0].botId}
                </span>
              </div>
              <div>
                <select
                  className="w-full p-2 bg-blue-200 text-white-100 transition-all duration-500 rounded-md focus:outline-none shadow-xl"
                  name=""
                  id=""
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option className="w-full p-2" value="ir">
                    فارسی
                  </option>
                  <option className="w-full p-2" value="en">
                    English
                  </option>
                  <option className="w-full p-2" value="ar">
                    العربيه
                  </option>
                  <option className="w-full p-2" value="tr">
                    Turkey
                  </option>
                </select>
              </div>
            </div>
            <div className="w-full h-full  bg-blue-200 transition-all duration-500 rounded-md shadow-xl overflow-hidden flex flex-col py-2 px-2 md:px-4">
              <div id="chat" className="flex-1 overflow-y-scroll p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-t-md transition-all duration-500 ${
                        message.sender === "user"
                          ? "bg-blue-100 text-white-100 rounded-bl-md"
                          : "bg-blue-300 text-white-100 rounded-br-md"
                      }`}
                    >
                      {message.text}
                      {message.file && message.sender === "user" && (
                        <div className="mt-2">
                          {console.log(message.file)}
                          {message.file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(message.file)}
                              alt="ارسال شده"
                              className="max-w-full rounded"
                            />
                          ) : (
                            <div className="p-2 bg-white bg-opacity-20 rounded">
                              <p>فایل پیوست شده: {message.file.name}</p>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="w-full flex gap-1">
                        <i
                          class={`${
                            message.sender === "user"
                              ? "ri-check-double-line"
                              : "hidden"
                          }`}
                        ></i>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* ورودی پیام */}
              <div className="py-4 px-3 bg-blue-300 rounded-md transition-all duration-500">
                {renderFilePreview()}
                <div className="flex items-center md:space-x-2">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 rounded-full hover:bg-blue-200 text-2xl text-white-100 transition-all duration-500"
                  >
                    <i class="ri-user-smile-line"></i>
                  </button>

                  <div className="relative">
                    <input
                      type=""
                      // onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="p-2 rounded-full hover:bg-blue-200 cursor-pointer text-2xl text-white-100 transition-all duration-500"
                    >
                      <i class="ri-attachment-2"></i>
                    </label>
                  </div>

                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 bg-gray-100 rounded-md md:py-2 md:px-4 focus:outline-none text-white-100 bg-transparent focus:ring-blue-500 transition-all duration-500"
                  />

                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-100 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    <i class="ri-send-plane-2-line"></i>
                  </button>
                </div>

                {showEmojiPicker && (
                  <div className="absolute bottom-20 right-4">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}
      </section>
    </>
  );
};

export default Chat;
