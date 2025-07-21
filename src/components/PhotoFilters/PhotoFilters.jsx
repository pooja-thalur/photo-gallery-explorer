import {useEffect, useState, useContext} from 'react';
import PhotoContext from '../../context/PhotoContext';
import './filters.css';

export default function PhotoFilters({
  searchText, setSearchText, sortOption, setSortOption, albumFilter, albumInput, setAlbumFilter
}) {
  useEffect(() => {
    console.log("Album input in filters:", albumInput);
  }, []);
  return (
    <div style={{ display: 'flex',
          gap: '1rem',
          padding: '10px',
          flexWrap: 'wrap' }}>
        <h1 className='photo-title'>Photo Gallery Explorer</h1>&nbsp;
      {/* Search */}
      <div style={{ padding: '0.5rem', minWidth: '200px' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={e => {  
              console.log(e.target.value);
              setSearchText(e.target.value) }}
          className="photo-filters"
        />
      </div>

      {/* Sort */}
      <div style={{ padding: '0.5rem', minWidth: '200px' }}>
        <select
          className="photo-filters"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="asc">Sort A–Z</option>
          <option value="desc">Sort Z–A</option>
        </select>
      </div>
            
      {/* Album Filter */}
      <div style={{ padding: '0.5rem', minWidth: '200px' }}>
        <select
          value={albumFilter}
          onChange={(e) => setAlbumFilter(e.target.value)}
          ref={albumInput}
          placeholder="Filter by Album"
          className="photo-filters"
        >
          <option value="">All Albums</option>
          {Array.from(albumInput).map(id => (
            <option key={id} value={id}>Album {id}</option>
          ))}
        </select>
      </div>

    </div>
  );
}