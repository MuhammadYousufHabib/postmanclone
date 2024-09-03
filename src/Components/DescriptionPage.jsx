import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DescriptionPage() {
  const { id } = useParams(); // Get the collection ID from the URL
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/collection/${id}`);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">{console.log(collection,"*")}
  <h1 className="text-2xl font-semibold text-gray-800 mb-2">Name : {collection.name}</h1>
  <p className="text-gray-600"> Description : {collection.description}</p>
</div>

  );
}

export default DescriptionPage;
