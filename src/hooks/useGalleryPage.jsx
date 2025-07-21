import { useState, useEffect } from 'react';

const BASE_URL = ' https://photo-generator-7si8.onrender.com';
const PAGE_SIZE = 100;

function usePhotos(page, setPhotos) {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${BASE_URL}/photos?_limit=${PAGE_SIZE}&_start=${page * PAGE_SIZE}`)
      .then(res => res.json())
      .then(json => {
        const data = json.data || [];
        setPhotos(prev => [...prev, ...data]);
        setHasMore(data.length === PAGE_SIZE);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching photos:", err);
        setError(err);
        setLoading(false);
      });
  }, [page]);

  return { loading, setLoading, hasMore, setHasMore, error };
}

export default usePhotos;
