import {createContext} from 'react';

const FiltersContext = createContext({
  searchText: '',
  updateSearchText: () => {},
  albumOptions: [],
  selectedAlbums: [],
  setSelectedAlbums: () => {},
  sortOption: 'asc',
  setSortOption: () => {},
  filteredPhotos: [],
  setFilteredPhotos: () => {},
  latencyLoading: false,
});
export default FiltersContext;
