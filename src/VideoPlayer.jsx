import React from 'react';

const VideoPlayer = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl">
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl"
        >
          &times;
        </button>
        <video controls autoPlay className="w-full">
          <source src={url} type="video/mp4" />
          مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
        </video>
        <div className="mt-4 flex justify-center">
          <a 
            href={url} 
            download
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            دانلود ویدیو
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;