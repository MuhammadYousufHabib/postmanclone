import React, { useEffect, useState } from 'react';
import Requestbody from './Requestbody';
import Requestparams from './Requestparams';
import ResponseViewer from './ResponseViewer';
import RequestHeader from './RequestHeader';
function RequestBuilder({ requestname, collectionId, requestId }) {
  
  const [method, setMethod] = useState('GET');
  const [req, setreq] = useState(null);
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [params, setParams] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState(''); 
 

 
  useEffect(() => {
    async function getRequestData() {
      try {
        const response = await fetch(`http://localhost:8000/request/${requestId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUrl(data.url);
        setMethod(data.method);
  
        const collectionResponse = await fetch(`http://localhost:8000/`);
        if (!collectionResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const collectionData = await collectionResponse.json();
  
        const collection = collectionData.find(col => Number(col.id) === Number(collectionId));
  
        const request = collection.requests.find(req => Number(req.id) === Number(requestId));
        setreq(request);
    
      
        if (request.params.length === 0) {
          setParams([{ key: '', value: '' }]);
          setBody('');
        }
         else {
          const param = request.params[request.params.length - 1];
          setBody(param.body);
  
          const queryParams = param.query_param.split(',').map(param => {
            const [key, value] = param.split(':');
            return { key: key.trim(), value: value.trim() };
          });
          setParams(queryParams);
        }

          try {
            if (request.responses.length>0) {
              const requestResponse = await fetch(`http://localhost:8000/response/${request.responses[0].id}`);
              
              if (!requestResponse.ok) {
                throw new Error(`HTTP error! in getting response: ${requestResponse.status}`);
              }
        
              const response = await requestResponse.json();
              setResponse(response);
            } else {
              console.warn('No responses available in the request object');
              setResponse(null)

            }
          } catch (error) {
            console.error('Error fetching request response:', error);
          }
      } catch (error) {
        console.error('Error fetching request data:', error);
      }
    }
  
    getRequestData();
  }, [requestId, collectionId]);
  


  async function sendRequest() {
    let apiUrl = `http://127.0.0.1:8000/request/${requestId}`;
    let payload = {
      collection_id: Number(collectionId),
      name: requestname || 'Untitled Request',
      method: method,
      url: url,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

  
      if (params.length > 0) {
        const paramPayload = {
          request_id: Number(requestId),
          query_param: params.map(param => `${param.key}:${param.value}`).join(','),
          body: body,
        };

        const paramResponse = await fetch('http://localhost:8000/parameter/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paramPayload),
        });

        if (!paramResponse.ok) {
          throw new Error(`Param API error! status: ${paramResponse.status}`);
        }

       
      }
    } catch (error) {
      console.error('Error making request:', error);
    }
     viewResponse(); 
  
     
    
    
  }
  const postResponse = async (data)=>{
    
    
    const postPayload = {
      request_id: Number(requestId) , 
      status_code: data?.status_code || '', 
      body: data?.json ? JSON.stringify(data.json) : '', 
      response_time: data?.response_time || '', 
      response_size: data?.response_size || '', 
    };
    if(req.responses.length>0){
    // Post the response to your API
    const postResponsed = await fetch(`http://localhost:8000/response/${req.responses[0].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postPayload),
    });

    if (!postResponsed.ok) {
      throw new Error(`Error posting response! status: ${postResponsed.status}`);
    }
  
  }
  else{
    const postResponsed = await fetch(`http://localhost:8000/response/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postPayload),
    });
    const collectionResponse = await fetch(`http://localhost:8000/`);
        if (!collectionResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const collectionData = await collectionResponse.json();
  
        // Find the specific collection
        const collection = collectionData.find(col => Number(col.id) === Number(collectionId));
  
        // Find the specific request within the collection
        const request = collection.requests.find(req => Number(req.id) === Number(requestId));
        setreq(request);

    if (!postResponsed.ok) {
      throw new Error(`Error posting response! status: ${postResponsed.status}`);
    }
  
  }
}
  
const viewResponse = async () => {
  try {
    let parsedBody = {};

    if (body) {
      try {
        parsedBody = JSON.parse(body); 
      } catch (error) {
        console.error('Error parsing body JSON:', error);
      }
    }


    const requestBody = {
      method: method,
      url: url,
      data: parsedBody,
    };

    const response = await fetch("http://localhost:8000/process_request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody) 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setResponse(data);
    postResponse(data); 
  } catch (error) {
    console.error('Error processing request:', error);
  }
};


  
  
const handleParamChange = (index, field, value) => {
  const updatedParams = [...params];
  updatedParams[index][field] = value;
  setParams(updatedParams);

  const queryString = updatedParams
    .filter(param => param.key) 
    .map(param => {
      const encodedKey = encodeURIComponent(param.key);
      const encodedValue = param.value ? `=${encodeURIComponent(param.value)}` : '';
      return `${encodedKey}${encodedValue}`;
    })
    .join('&');

  const baseUrl = url.split('?')[0]; 
  setUrl(queryString ? `${baseUrl}?${queryString}` : baseUrl); 
};




  const addParam = () => {
    setParams([...params, { key: '', value: '' }]);
  };
  const deleteParam = (index) => {
    const updatedParams = params.filter((_, i) => i !== index);
    setParams(updatedParams);
  
    const queryString = updatedParams
      .filter(param => param.key) 
      .map(param => {
        const encodedKey = encodeURIComponent(param.key);
        const encodedValue = param.value ? `=${encodeURIComponent(param.value)}` : '';
        return `${encodedKey}${encodedValue}`;
      })
      .join('&');
  
    const baseUrl = url.split('?')[0]; 
    setUrl(queryString ? `${baseUrl}?${queryString}` : baseUrl); 
  };
  
  
  
  const handleHeaderChange = (index, field, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const deleteHeader = (index) => {
    const updatedHeaders = headers.filter((_, i) => i !== index);
    setHeaders(updatedHeaders);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="text"
          placeholder="Request Name (Optional)"
          value={requestname}
          className="p-1 border rounded w-1/3"
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="p-1 border rounded w-24"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-1 border rounded"
        />
        <button 
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={sendRequest} 
        >
          Send
        </button>
      </div>

      <Requestparams 
        params={params} 
        handleParamChange={handleParamChange} 
        addParam={addParam} 
        deleteParam={deleteParam} 
    
      />
      <RequestHeader 
        headers={headers} 
        handleHeaderChange={handleHeaderChange} 
        addHeader={addHeader} 
        deleteHeader={deleteHeader} 
      />
      <Requestbody 
        body={body} 
        setBody={setBody} 
      
      />
      <ResponseViewer   response={response}/>
    </div>
  );
}

export default RequestBuilder;