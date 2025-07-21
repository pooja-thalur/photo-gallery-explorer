import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import './style.css';
import PhotoDetails from './PhotoDetails';

export default function Photo({ data , index}) {
    const navigate = useNavigate();

    const photoClicked = (photo) => {
        console.log("Photo clicked", photo.id);
        navigate(`/photo/${photo.id}`, { state: { photo } }, {component: PhotoDetails });
    }
    // const index = rowIdx * columnCount + colIdx;
    // if(index>= photo.length) {
    //     return null;
    // }
    const photo = data[index];
    // console.log("Rendering photo", index, photo);

    return (
        <div className="photo" key={photo.id} onClick={() => photoClicked(photo)}>
            {/* <Routes> */}
            {/* <Route path={`/photo/${photo.id}`} state={{ photo }} className="photo-link"> */}
                <img src={photo.thumbnailUrl} alt={photo.title} onClick={() => photoClicked(photo)} />
                <div className="photo-item">
                    <p className="photo-album">{photo.albumId}</p>
                    <p className="photo-title">{photo.title}</p>
                    <p className="photo-url" >{photo.url}</p>
                </div>
            {/* </Route>
            </Routes> */}
        </div>
    );
}

