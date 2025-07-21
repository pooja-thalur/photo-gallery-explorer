import {useEffect, useState, useContext} from 'react';
import PhotoSearch from '../PhotoSearch';
import PhotoContext from '../../context/PhotoContext';

export default function PhotoFilters({
  searchText, setSearchText, sortOption, setSortOption, albumFilter, albumInput, setAlbumFilter
}) {
  const { photos } = useContext(PhotoContext); // This should be replaced with the actual photos data
  useEffect(() => {
    console.log("Album input in filters:", albumInput);
  }, []);
  return (
    <div style={{ display: 'flex',
          gap: '1rem',
          padding: '10px',
          flexWrap: 'wrap' }}>
      {/* Search */}
      <div style={{ padding: '0.5rem', minWidth: '200px' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={e => { 
              console.log(e.target.value);
              setSearchText(e.target.value) }}
          style={{ width: '100%', padding: 8, fontSize: 16 }}
        />
      </div>
      <div style={{ padding: '0.5rem', minWidth: '200px' }}>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ padding: '0.5rem' }}
        >
          <option value="asc">Sort A–Z</option>
          <option value="desc">Sort Z–A</option>
        </select>
      </div>
            
      {/* Album Filter */}
      <select
        value={albumFilter}
        onChange={(e) => setAlbumFilter(e.target.value)}
        style={{ padding: '0.5rem' }}
      >
        <option value="">All Albums</option>
        {albumInput.map(id => (
          <option key={id} value={id}>Album {id}</option>
        ))}
      </select>

    </div>
  );
}