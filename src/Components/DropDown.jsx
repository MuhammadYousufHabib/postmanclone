import React, { useRef, useEffect } from 'react';

function DropDown({ isOpen, onAddRequest, onViewDescription, onDeleteCollection, onClose }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <ul 
      ref={dropdownRef} 
      className="text-xs absolute right-0 mt-20 w-48 bg-white border border-gray-200 rounded shadow-md z-10"
    >
      <li
        onClick={() => {
          onAddRequest();
          onClose();
        }}
        className="cursor-pointer px-4 py-1 hover:bg-gray-100"
      >
        Add Request
      </li>
      <li
        onClick={() => {
          onViewDescription();
          onClose();
        }}
        className="cursor-pointer px-4 py-1 hover:bg-gray-100"
      >
        View Description
      </li>
      <li
        onClick={() => {
          onDeleteCollection();
          onClose();
        }}
        className="cursor-pointer px-4 py-1 hover:bg-gray-100"
      >
        Delete Collection
      </li>
    </ul>
  );
}

export default DropDown;
