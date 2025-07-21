import { useLocation } from 'react-router-dom';
import './photo-details.css';

export default function PhotoDetails({ state }) {
    const location = useLocation();
    const photo = location.state?.photo;
    console.log("PhotoDetails component rendered with photo:", location.state);

    if (!photo) {
        return <h1 style={{ textAlign: 'center' }}>No photo details available. Please go back and click again.</h1>;
    }
    return (
        <div className="photo-details">    
            <img src={photo.url} alt={photo.title} />
            <h2>{photo.title}</h2>
            <p>Album ID: {photo.albumId}</p>
            <p>Photo ID: {photo.id}</p>
            <p>Thumbnail URL: {photo.thumbnailUrl}</p>
            <p>Full URL: {photo.url}</p>
        </div>
    );
}