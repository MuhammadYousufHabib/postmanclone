import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import DescriptionPage from './Components/DescriptionPage'; 
import { useState } from 'react';
import RequestBuilder from './Components/RequestBuilder';
function App() {
  const [requestname, setrequestname] = useState("") 
  return (
    <BrowserRouter>
      <div className="flex h-screen ">
        <Sidebar setrequestname={setrequestname}/>
        <div className="flex-1 p-4 m-0  text-sm">
          <Routes>
            <Route path="/" element={<h2 className='text-center mt-[25%] text-4xl'>Welcome to Postman</h2>} />
            <Route path="/collection/:collectionId/request/:requestId" element={<RequestBuilder  requestname={requestname}/>} />
            <Route path="/collection/:id/description" element={<DescriptionPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
