import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './photo-details.css';

export default function PhotoDetails({ state }) {
    const location = useLocation();
    const photo = location.state?.photo;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    console.log("PhotoDetails component rendered with photo:", location.state);

    if (!photo) {
        return <h1 style={{ textAlign: 'center' }}>No photo details available. Please go back and click again.</h1>;
    }
    return (
        <div className="photo-details">
            {loading && (
                <div className="image-loader">
                <div className="spinner" />
                <p>Loading image...</p>
                </div>
            )}

            {!error && (
                <img
                src={photo.url}
                alt={photo.title}
                style={{ display: loading ? 'none' : 'block' }}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setLoading(false);
                    setError(true);
                }}
                />
            )}
            {error &&
                <p className="error-message">Error loading image. Please try again later.</p>
            }
            <h2>{photo.title}</h2>
            <p>Album ID: {photo.albumId}</p>
            <p>Photo ID: {photo.id}</p>
            <p>Thumbnail URL: {photo.thumbnailUrl}</p>
            <p>Full URL: {photo.url}</p>
        </div>
    );
}