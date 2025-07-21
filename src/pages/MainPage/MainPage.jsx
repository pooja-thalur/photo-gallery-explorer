import { useState, useRef, useCallback } from 'react';
import PhotoContext from '../../context/PhotoContext';
import FiltersContext from '../../context/FiltersContext';
import GalleryPage from '../GalleryPage';
import './style.css';
import useGalleryPage from '../../hooks/useGalleryPage';
import debounce from 'lodash.debounce';

export default function MainPage() {

    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);

    const [searchText, setSearchText] = useState('');
    const [sortOption, setSortOption] = useState('asc');

    const {loading, setLoading, hasMore, setHasMore, error } = useGalleryPage( page , setPhotos);
    const [filteredPhotos, setFilteredPhotos] = useState(photos);

    const debounceRef = useRef(
        debounce(() => {
            setPage(prev => {
                console.log("Loading more photos, current page:", prev + 1);
                return prev + 1;
            });
        }, 300)
    );

    const loadMore = useCallback(() => {
        if (hasMore && !loading) {
            debounceRef.current();
        }
    }, [hasMore, loading]);

    return (
        <PhotoContext.Provider value={{ photos, setPhotos, page, loadMore, loading, hasMore }}>
        <FiltersContext.Provider value={{
            searchText, setSearchText, sortOption, setSortOption, filteredPhotos, setFilteredPhotos
        }}>
            <div className="main-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <GalleryPage loadMore={loadMore} loading={loading} hasMore={hasMore} />
            </div>
        </FiltersContext.Provider>
        </PhotoContext.Provider>
    );
}