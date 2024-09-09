import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import DescriptionPage from './pages/DescriptionPage'; 
import { useState } from 'react';
import RequestBuilder from './pages/RequestBuilder';
import NotFoundPage from './pages/NotFound';
function App() {
 const location= useLocation()
  const [requestname, setrequestname] = useState("") 
  return (
   
      <div className="flex h-screen ">
      {location.pathname !=='/pagenotfound' && <Sidebar setrequestname={setrequestname} />}         <div className="flex-1  m-0  text-sm">
          <Routes>
            <Route path="/" element={<h2 className='text-center mt-[25%] text-4xl'>Welcome to Postman</h2>} />
            <Route path="/collection/:collectionId/request/:requestId" element={<RequestBuilder  requestname={requestname}/>} />
            <Route path="/collection/:id/description" element={<DescriptionPage />} />
            <Route path="/pagenotfound" element={<NotFoundPage />} />
            
          </Routes>
        </div>
      </div>

  );
}

export default App;
