import React, { useCallback, useContext, useNavigate, useEffect } from 'react';
import PhotoContext from '../../context/PhotoContext';
import Photo from '../Photo';
import { VariableSizeGrid as Grid } from 'react-window';
import debounce from 'lodash/debounce';


import '../style.css';

const COLUMN_COUNT = 5;
const CARD_WIDTH = 500;
const CARD_HEIGHT = 180; 
const GRID_HEIGHT = 600;
const GRID_WIDTH = CARD_WIDTH * COLUMN_COUNT + 20; // 20px for padding

export function Gallery({ photos, loading, hasMore }) {
    const { loadMore} = useContext(PhotoContext);
    const data = photos || photos.data || [];
    console.log("Actual photos data:", photos);
    const totalLength = photos.length;
    const rowCount = Math.ceil(totalLength / COLUMN_COUNT);
    const columnWidths = Array(COLUMN_COUNT).fill(CARD_WIDTH);
    const rowHeight = Array(rowCount).fill(CARD_HEIGHT);

    const Cell = ({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * COLUMN_COUNT + columnIndex;
        // console.log("Rendering cell at index:", columnIndex, "row ", rowIndex, "with style:", style);
        if (index >= data.length) return null;
        // const photo = data[index];
        return (
        <div style={{...style}} className="photo-item">
            <Photo data={data} index={index} />
        </div>
        );
    };

    // const navigate = useNavigate();

    // const photoClicked = (photo) => {
    //     console.log("Photo clicked", photo.id);
    //     navigate(`/photo/${photo.id}`, { state: { photo } });
    // }

    const handleScroll = useCallback(
        debounce(({ scrollTop }) => {
            const totalHeight = rowCount * CARD_HEIGHT;
            const visibleHeight = window.innerHeight - 100;
            const scrollPosition = scrollTop + visibleHeight;
            const threshold = totalHeight * 0.8;

            console.log("Scroll position:", scrollPosition, "Threshold:", threshold, "Total height:", totalHeight);

            if (hasMore && !loading && scrollPosition >= threshold) {
            console.log("Reached the bottom of the grid, loading more photos");
            loadMore();
            }
        }, 300), // 300ms delay
        [rowCount, hasMore, loadMore, loading]
    );

    
    return (
        <Grid
            columnCount={5}
            columnWidth={index => columnWidths[index]}
            height={GRID_HEIGHT + 20 * rowCount}
            rowCount={rowCount}
            rowHeight={index => rowHeight[index]}
            width={GRID_WIDTH}
            onScroll={handleScroll}
        >
            {Cell}
        </Grid>
    );
}

