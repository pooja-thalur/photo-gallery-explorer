import React, { useState, useEffect, useCallback } from 'react';
import PhotoContext from '../../context/PhotoContext';
import FiltersContext from '../../context/FiltersContext';
import GalleryPage from '../GalleryPage';
import './style.css';
import useGalleryPage from '../../hooks/useGalleryPage';

export default function MainPage() {
    const PAGE_SIZE = 100;

    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);
    // const [hasMore, setHasMore] = useState(false);
    // const [loading, setLoading] = useState(true);

    const [searchText, setSearchText] = useState('');
    const [sortOption, setSortOption] = useState('asc');

    const {loading, setLoading, hasMore, setHasMore, error } = useGalleryPage( page , setPhotos);
    const [filteredPhotos, setFilteredPhotos] = useState(photos);

    const loadMore = () => {
        if (!loading && hasMore) {
        setPage(prev => { 
            console.log("Loading more photos, current page:", prev);
            return prev + 1 });
        }
    };

    return (
        <PhotoContext.Provider value={{ photos, setPhotos, page, loadMore, loading, hasMore }}>
        <FiltersContext.Provider value={{
            searchText, setSearchText, sortOption, setSortOption, filteredPhotos, setFilteredPhotos
        }}>
            <div>
            <h1>Photo Gallery Explorer</h1>
            <GalleryPage loadMore={loadMore} loading={loading} hasMore={hasMore} />
            </div>
        </FiltersContext.Provider>
        </PhotoContext.Provider>
    );
}