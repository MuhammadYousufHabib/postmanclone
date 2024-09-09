import { useState, useEffect } from 'react';
import { fetchCollections, createCollection, addRequest, deleteRequest, deleteCollection } from '../services/RequestService';

export const useCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCollections = async () => {
    try {
      const data = await fetchCollections();
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

  useEffect(() => {
    loadCollections();
  }, []);

  const createNewCollection = async (name, description) => {
    if (name !== '') {
      try {
        const newCollectionData = await createCollection(name, description);
        setCollections([...collections, { ...newCollectionData, requests: [] }]);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const addNewRequest = async (collectionIndex, requestName) => {
    try {
      const newRequestData = await addRequest(collections[collectionIndex].id, requestName);
      const updatedCollections = collections.map((collection, idx) => {
        if (idx === collectionIndex) {
          return { ...collection, requests: [...collection.requests, newRequestData] };
        }
        return collection;
      });
      setCollections(updatedCollections);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeRequest = async (collectionIndex, requestId) => {
    try {
      await deleteRequest(requestId);
      const updatedCollections = collections.map((collection, idx) => {
        if (idx === collectionIndex) {
          return { ...collection, requests: collection.requests.filter(request => request.id !== requestId) };
        }
        return collection;
      });
      setCollections(updatedCollections);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeCollection = async (collectionId) => {
    try {
      await deleteCollection(collectionId);
      const newCollections = collections.filter(collection => collection.id !== collectionId);
      setCollections(newCollections);
    } catch (err) {
      setError(err.message);
    }
  };

  return { collections, loading, error, createNewCollection, addNewRequest, removeRequest, removeCollection };
};
