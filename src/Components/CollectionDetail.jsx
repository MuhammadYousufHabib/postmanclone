import React from 'react';
import { useLocation } from 'react-router-dom';

function CollectionDetail() {
  const location = useLocation();
  const { collection } = location.state || {};

  if (!collection) {
    return <p className='text-center'>No Request selected</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{collection.name}</h1>
      <p className="text-gray-600">{collection.description}</p>
    </div>
  );
}

export default CollectionDetail;
