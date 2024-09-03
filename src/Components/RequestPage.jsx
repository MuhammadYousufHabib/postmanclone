import React from 'react';
import { useParams } from 'react-router-dom';
import RequestBuilder from './RequestBuilder';
import ResponseViewer from './ResponseViewer';

function RequestPage({requestname}) {
  const { collectionId, requestId } = useParams();
  // Fetch collection and request details based on collectionId and requestId

  // Example fetch logic (replace with actual logic)
  const collection = {}; // Fetch or get the collection based on collectionId
  const request = {}; // Fetch or get the request based on requestId

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <RequestBuilder collectionId={collectionId} requestId={requestId} requestname={requestname}/>
        
      </div>

      <div className="flex-1">
      </div>
    </div>
  );
}

export default RequestPage;
