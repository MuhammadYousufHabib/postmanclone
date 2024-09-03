import React from 'react';
import RequestBuilder from './RequestBuilder';
import ResponseViewer from './ResponseViewer';

function Collection({ collection }) {
  return (
    <div className="flex flex-col flex-1 p-6 bg-gray-100">
      <h2 className="text-2xl mb-4">{collection.name}</h2>
      <p className="text-gray-700 mb-4">{collection.description}</p>
      <RequestBuilder collection={collection} />
      <ResponseViewer collection={collection} />
    </div>
  );
}

export default Collection;
