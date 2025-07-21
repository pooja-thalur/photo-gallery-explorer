import Gallery from '../../components/Gallery';
import PhotoFilters from '../../components/PhotoFilters';
import { useContext, useEffect, useState, useRef } from 'react';
import FiltersContext from '../../context/FiltersContext';
import PhotoContext from '../../context/PhotoContext';

export default function GalleryPage({ loadMore, loading, hasMore } ) {
    const { searchText, setSearchText, sortOption, setSortOption, filteredPhotos, setFilteredPhotos } = useContext(FiltersContext);
    const { photos } = useContext(PhotoContext);
    const [albumFilter, setAlbumFilter] = useState([]);
    const albumInput = useRef(new Set());

    useEffect(() => {
        let active = true;
        const debounceTimer = setTimeout(() => {
            let result = photos;
            
            // First filter by search text
            if (searchText) {
                result = result ? result.filter(photo => {
                    return photo.title.toLowerCase().includes(searchText.toLowerCase())
                }) : [];
            }

            result.forEach(photo => albumInput.current.add(photo.albumId));

            console.log("Filtered photos by search text in page:", searchText, sortOption);

            // Sort by title
            result = result.sort((a, b) => {
                return sortOption === 'asc' ? a.id - b.id : b.id - a.id;
            });

            // Filter by album ids
            if (albumFilter.length > 0) {
                result = result.filter(photo =>
                    albumFilter.includes(photo.albumId)
                );
            }

            if (active) {
                setFilteredPhotos(result);
            }
        }, 300);
        return () => {
            active = false;
            clearTimeout(debounceTimer);
        };
    }, [searchText, sortOption, albumFilter, photos]);

    return (
        <>
            {/* <h1>Photo Gallery Explorer</h1> */}
            <PhotoFilters searchText={searchText} setSearchText={setSearchText} sortOption={sortOption} 
                setSortOption={setSortOption} setFilteredPhotos={setFilteredPhotos} albumFilter={albumFilter} 
                albumInput={albumInput.current}
                setAlbumFilter={setAlbumFilter} 
            />
            <Gallery photos={filteredPhotos} loadMore={loadMore} loading={loading} hasMore={hasMore}/>
        </>
    );
}