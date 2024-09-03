import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';
import { useNavigate } from 'react-router-dom';

function Sidebar({setrequestname}) {
  const navigate = useNavigate();const dropdownRef = useRef(null);
  const [collections, setCollections] = useState([]);
  const [newCollection, setNewCollection] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [dropDownOpen, setDropDownOpen] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
 const handleCloseDropDown = () => {
  setDropDownOpen(null);
};

  useEffect(() => { 
    const fetchCollections = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000');
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        const data = await response.json();
        setCollections(data.map(collection => ({
          ...collection,
          requests: collection.requests || [], 
        })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleCreateCollection = async () => {
    if (newCollection !== '') {
      try {
        const response = await fetch('http://127.0.0.1:8000/collection/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newCollection,
            description: newDescription,
            requests: [] 
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create collection');
        }

        const newCollectionData = await response.json();
        setCollections([...collections, {
          ...newCollectionData,
          requests: [], 
        }]);
        setNewCollection('');
        setNewDescription('');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleInputChange = (e) => {
    setNewCollection(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateCollection();
    }
  };

  const handleDropDownToggle = (index) => {
    setDropDownOpen(dropDownOpen === index ? null : index);
  };
  const handleDeleteRequest = async (collectionIndex, requestId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/request/${requestId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete request');
      }
  
      const updatedCollections = collections.map((collection, idx) => {
        if (idx === collectionIndex) {
          return {
            ...collection,
            requests: collection.requests.filter(request => request.id !== requestId)
          };
        }
        return collection;
      });
  
      setCollections(updatedCollections);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleAddRequest = async (collectionIndex) => {
    const requestName = prompt('Enter request name:');
    const name = requestName || 'Untitled Request';
    try {
      const response = await fetch('http://127.0.0.1:8000/request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection_id: collections[collectionIndex].id,
          name: name,
          method: 'GET', 
          url: ''     
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create request');
      }
  
      const newRequestData = await response.json();
  
      const updatedCollections = collections.map((collection, idx) => {
        if (idx === collectionIndex) {
          return {
            ...collection,
            requests: [...collection.requests, newRequestData] 
          };
        }
        return collection;
      });
  
      setCollections(updatedCollections);
      setDropDownOpen(null);
    } catch (err) {
      setError(err.message);
    }
  };
  
  

  const handleViewDescription = (collection) => {
    // Navigate to a new route with the collection ID
    navigate(`/collection/${collection.id}/description`);
  };

  const handleDeleteCollection = async (collectionId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/collection/${collectionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete collection');
      }

      const newCollections = collections.filter(collection => collection.id !== collectionId);
      setCollections(newCollections);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-2 text-xs">
      <p className="text-lg">Collections</p>
      <div>
        <input
          type="text"
          className="bg-white text-sm p-1 border border-gray-300 rounded w-full"
          placeholder="Enter collection name"
          value={newCollection}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <input
          type="text"
          className="bg-white text-sm p-1 border border-gray-300 rounded w-full my-2"
          placeholder="Enter collection description"
          value={newDescription}
          onChange={handleDescriptionChange}
          onKeyDown={handleKeyPress}
        />
        <button
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded w-full hover:bg-blue-600 mb-3"
          onClick={handleCreateCollection}
        >
          + Create New Collection
        </button>
      </div>
      <ul className="space-y-2">
        {collections.map((collection, index) => (
          <li key={collection.id} className="bg-gray-100 p-1 rounded cursor-pointer text-xs flex flex-col relative h- border border-gray-300">
            <div className="flex justify-between items-center text-xs">
              {collection.name}
              <button
                className="text-sm h-4"
                onClick={() => handleDropDownToggle(index)}
              >
                ⮟
              </button>
              <DropDown
  ref={dropdownRef} 
  isOpen={dropDownOpen === index}
  onAddRequest={() => handleAddRequest(index)}
  onViewDescription={() => handleViewDescription(collection)}
  onDeleteCollection={() => handleDeleteCollection(collection.id)}
  onClose={handleCloseDropDown} 
  
/>
            </div>
            {collection.requests.length > 0 && (
              <ul className="ml-4 mt-2 space-y-1 ">
                {collection.requests.map((request, reqIndex) => (
                  <li key={request.id} className="bg-gray-200 p-1 border border-gray-400 text-xs flex justify-between">
                  <Link
  to={`/collection/${collection.id}/request/${request.id}`}
  onClick={() => setrequestname(request.name)}
>
  {request.name}
</Link> 
                    <button
          onClick={() => handleDeleteRequest(index, request.id)}
          className="text-red-500 ml-2 hover:text-red-700 "
        >
        ✕
        </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
