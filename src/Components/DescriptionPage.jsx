import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DescriptionPage() {
  const { id } = useParams(); 
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false); 
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(`http://localhost:8000/collection/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch collection');
        }
        const data = await response.json();
        setCollection(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  const editDescription = async () => {
    const newDescription = prompt('Enter new Description');
    if (newDescription === null || newDescription.trim() === '') {
      return;
    }

    setUpdating(true); 
    try {
      const response = await fetch(`http://127.0.0.1:8000/collection/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to update description');
      }

      setCollection(prevCollection => ({
        ...prevCollection,
        description: newDescription,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false); 
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex justify-between'>
      <div className="p-4 bg-white rounded-lg ">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Name: {collection.name}</h1>
        <p className="text-gray-600 text-justify">Description: {collection.description}</p>
      </div>
      <button onClick={editDescription} disabled={updating}>
        {updating ? 'Updating...' : '🖊️'}
      </button>
    </div>
  );
}

export default DescriptionPage;
