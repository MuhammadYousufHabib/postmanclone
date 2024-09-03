import React from 'react'

const Requestbody = ({body,setBody}) => {
  return (
    <div className="">
    <h3 className="font-semibold mb-1 text-sm">Body</h3>
    <textarea
      placeholder="Enter request body"
      value={body}
      onChange={(e) => setBody(e.target.value)}
      className="w-full p-1 border rounded resize-none"
      rows="3"
    />
  </div>
  )
}

export default Requestbody