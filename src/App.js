import React, { useState } from 'react';
import './index.css';
import Content from './component/Content';
import { BrowserRouter } from 'react-router';


function App() {

  

  return (
    <BrowserRouter>
      <div className="bg-white dark:bg-blue-300 font-sans h-screen overflow-hidden">
        <div className='flex h-full'>
          <Content/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
