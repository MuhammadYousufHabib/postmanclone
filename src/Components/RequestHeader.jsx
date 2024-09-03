import React from 'react';

const RequestHeader = ({ headers, handleHeaderChange, addHeader, deleteHeader }) => {
  return (
    <div >
      <h3 className="font-semibold mb-1 text-sm">Headers</h3>
      {headers.map((header, index) => (
        <div key={index} className="flex items-center space-x-2 mb-1">
          <input
            type="text"
            placeholder="Key"
            value={header.key}
            onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
            className="flex-1 p-1 border rounded"
          />
          <input
            type="text"
            placeholder="Value"
            value={header.value}
            onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
            className="flex-1 p-1 border rounded"
          />
          <button
            onClick={() => deleteHeader(index)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="text-blue-500 hover:underline text-sm"
        onClick={addHeader}
      >
        + Add header
      </button>
    </div>
  );
};

export default RequestHeader;
