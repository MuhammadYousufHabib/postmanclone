import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import RequestPage from './Components/RequestPage'; // Import the new component
import DescriptionPage from './Components/DescriptionPage'; // Create this component
import { useState } from 'react';
function App() {
  const [requestname, setrequestname] = useState("") 
  return (
    <BrowserRouter>
      <div className="flex h-screen text">
        <Sidebar setrequestname={setrequestname}/>
        <div className="flex-1 p-7 m-0  text-sm">
          <Routes>
            <Route path="/" element={<h2 className='text-center'>Welcome to the App</h2>} />
            <Route path="/collection/:collectionId/request/:requestId" element={<RequestPage setrequestname={setrequestname} requestname={requestname}/>} />
            <Route path="/collection/:id/description" element={<DescriptionPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
