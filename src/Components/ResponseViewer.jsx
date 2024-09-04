import React from 'react';

function ResponseViewer({ response }) {
  if (response===null) {
    return <><p className='font-bold text-lg p-2'>Response Details</p><div className="p-4 text-center text-gray-600 mt-[10%]">No response available.</div>;</>
  }

  const isLegacyFormat = !response.hasOwnProperty('json') && !response.hasOwnProperty('headers');

  const responseBody = isLegacyFormat
    ? response.body
    : typeof response.json === 'object'
    ? JSON.stringify(response.json, null, 2)
    : response.json || 'N/A';

  const headers = isLegacyFormat
    ? 'null'
    : response.headers
    ? JSON.stringify(response.headers, null, 2)
    : 'null';

  const cookies = isLegacyFormat
    ? 'N/A'
    : response.cookies
    ? JSON.stringify(response.cookies, null, 2)
    : 'N/A';

  return (
    <div className="flex-1 p-1 ">
      <h3 className="text-lg font-bold m-1 text-black-600">Response Details</h3>
      <div className="bg-gray-100 p-2 border rounded shadow-lg max-h-screen overflow-y-auto w-[1070px] h-60">
        {response ? (
          <>
            <div className="flex flex-wrap mb-2 text-sm text-gray-700">
              <div className="mr-4">
                <strong>Status Code:</strong> {response.status_code ?? 'N/A'}
              </div>
              <div className="mr-4">
                <strong>Response Time:</strong> {response.response_time ? `${response.response_time} ms` : 'N/A'}
              </div>
              <div className="mr-4">
                <strong>Response Size:</strong> {response.response_size ? `${response.response_size} bytes` : 'N/A'}
              </div>
              {!isLegacyFormat && (
                <div className="mr-4">
                  {/* <strong>Cookies:</strong> {cookies} */}
                </div>
              )}
            </div>

            <div className="flex flex-wrap -mx-2">
              {!isLegacyFormat && (
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <strong className="block mb-1 text-sm text-gray-800 ">Headers:</strong>
                  <div className="bg-gray-50 h-40 border rounded text-xs overflow-y-auto">
                    <pre className="whitespace-pre-wrap p-3 max-w-full break-words">{headers}</pre>
                  </div>
                </div>
              )}
              <div className="w-full md:w-1/2 px-2 mb-4">
                <strong className="block mb-1 text-sm text-gray-800">Response Body:</strong>
                <div className="bg-gray-50 h-40 border rounded text-xs overflow-y-auto">
                  <pre className="whitespace-pre-wrap p-3 max-w-full break-words">{responseBody}</pre>
                </div>
              </div>
            </div>

            {!isLegacyFormat && (
              <div className="mb-4">
               
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-600">No response yet...</p>
        )}
      </div>
    </div>
  );
}

export default ResponseViewer;