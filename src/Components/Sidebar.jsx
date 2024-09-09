import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';
import { useNavigate } from 'react-router-dom';
import { useCollections } from '../hooks/useCollection';
//nocomment
function Sidebar({ setrequestname }) {
  const navigate = useNavigate();
  const [newCollection, setNewCollection] = useState('');
  const [Description, setDescription] = useState('');
  const [dropDownOpen, setDropDownOpen] = useState(null);

  const { 
    collections, 
    loading, 
    error, 
    createNewCollection, 
    addNewRequest, 
    removeRequest, 
    removeCollection 
  } = useCollections();

  const handleInputChange = (e) => {
    setNewCollection(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateCollection();
    }
  };

  const handleCloseDropDown = () => {
    setDropDownOpen(null);
  };

  const handleDropDownToggle = (index) => {
    setDropDownOpen(dropDownOpen === index ? null : index);
  };

  const handleCreateCollection = () => {
    if (newCollection) {
      createNewCollection(newCollection, Description);
      setNewCollection('');
      setDescription('');
    }
  };

  const handleAddRequest = (collectionIndex) => {
    const requestName = prompt('Enter request name:') || 'Untitled Request';
    addNewRequest(collectionIndex, requestName);
    setDropDownOpen(null);
  };

  const handleDeleteRequest = (collectionIndex, requestId) => {
    removeRequest(collectionIndex, requestId);
  };

  const handleViewDescription = (collection) => {
    navigate(`/collection/${collection.id}/description`);
  };

  const handleDeleteCollection = (collectionId) => {
    removeCollection(collectionId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-56 min-w-56 bg-gray-50 border-r border-gray-300 p-2 space-y-4 text-xs mt-3 h-[98%] overflow-y-auto shadow-lg rounded-lg">
      <div className="space-y-3">
        <input
          type="text"
          className="bg-white text-sm p-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter collection name"
          value={newCollection}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <input
          type="text"
          className="bg-white text-sm p-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter collection description"
          value={Description}
          onChange={handleDescriptionChange}
          onKeyDown={handleKeyPress}
        />
        <button
          className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg w-full shadow-md hover:bg-blue-700 transition-colors duration-300"
          onClick={handleCreateCollection}
        >
          + Create New Collection
        </button>
      </div>

      <ul className="space-y-3">
        {collections.map((collection, index) => (
          <li key={collection.id} className="bg-white p-2 rounded-lg shadow-md border border-gray-300">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="truncate text-gray-700">{collection.name}</span>
              <button
                className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                onClick={() => handleDropDownToggle(index)}
              >
                ⮟
              </button>
              <DropDown
                isOpen={dropDownOpen === index}
                onAddRequest={() => handleAddRequest(index)}
                onViewDescription={() => handleViewDescription(collection)}
                onDeleteCollection={() => handleDeleteCollection(collection.id)}
                onClose={handleCloseDropDown}
              />
            </div>
            {collection.requests.length > 0 && (
              <ul className="ml-4 mt-2 space-y-2">
                {collection.requests.map((request) => (
                  <li key={request.id} className="flex justify-between bg-gray-50 p-2 rounded-lg shadow-sm border border-gray-300 text-xs items-center">
                    <Link
                      to={`/collection/${collection.id}/request/${request.id}`}
                      onClick={() => setrequestname(request.name)}
                      className="text-blue-500 hover:underline truncate"
                    >
                      {request.name}
                    </Link>
                    <button
                      onClick={() => handleDeleteRequest(index, request.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
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
