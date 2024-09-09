const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchCollections = async () => {
  const response = await fetch(`${API_BASE_URL}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }
  return await response.json();
};

export const createCollection = async (name, description) => {
  const response = await fetch(`${API_BASE_URL}/collection/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, requests: [] }),
  });
  if (!response.ok) {
    throw new Error('Failed to create collection');
  }
  return await response.json();
};

// Add a request to a collection
export const addRequest = async (collectionId, requestName) => {
  const response = await fetch(`${API_BASE_URL}/request/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      collection_id: collectionId,
      name: requestName || 'Untitled Request',
      method: 'GET',
      url: '',
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create request');
  }
  return await response.json();
};

// Delete a request
export const deleteRequest = async (requestId) => {
  const response = await fetch(`${API_BASE_URL}/request/${requestId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete request');
  }
};

// Delete a collection
export const deleteCollection = async (collectionId) => {
  const response = await fetch(`${API_BASE_URL}/collection/${collectionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete collection');
  }
};
