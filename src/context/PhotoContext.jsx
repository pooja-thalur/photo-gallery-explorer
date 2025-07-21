import { set } from "lodash";
import { createContext } from "react";

const PhotoContext = createContext({
    photos: [],
    page: 0,
    loadMore: () => {},
    setPhotos: () => {},
});

export default PhotoContext;
