import React from 'react'

const Requestparams = ({params,handleParamChange,addParam,deleteParam}) => {
  return (
    <div>
    <h3 className="font-semibold mb-1 text-sm">Params</h3>
    {params.map((param, index) => (
      <div key={index} className="flex items-center space-x-2 mb-1">
        <input
          type="text"
          placeholder="Key"
          value={param.key}
          onChange={(e) => handleParamChange(index, 'key', e.target.value)}
          className="flex-1 p-1 border rounded"
        />
        <input
          type="text"
          placeholder="Value"
          value={param.value}
          onChange={(e) => handleParamChange(index, 'value', e.target.value)}
          className="flex-1 p-1 border rounded"
        />
        <button
          onClick={() => deleteParam(index)}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    ))}
    {/* <button
      className="text-blue-500 hover:underline text-sm "
      onClick={addParam}
    >
      + Add param
    </button> */}
  </div>
  )
}

export default Requestparams