import { useCallback, useContext, useRef, useEffect } from 'react';
import PhotoContext from '../../context/PhotoContext';
import Photo from '../Photo';
import { FixedSizeGrid as Grid } from 'react-window';
import debounce from 'lodash/debounce';
import AutoSizer from 'react-virtualized-auto-sizer';
import Loader from '../Loader';

import '../style.css';

const COLUMN_COUNT = 3;
const CARD_HEIGHT = 180; // Adjust height for smaller screens

export function Gallery({ photos, loading, hasMore }) {
    const { loadMore} = useContext(PhotoContext);
    const data = photos || [];
    const totalLength = data.length;
    const rowCount = Math.ceil(totalLength / COLUMN_COUNT);

    const Cell = ({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * COLUMN_COUNT + columnIndex;
        if (index >= data.length) return null;
        return (
            <div style={{...style, padding: '10px'}} className="photo-item">
                <Photo data={data} index={index} />
            </div>
        );
    };

    const isFetchingRef = useRef(false);

    const handleScroll = useCallback(
        debounce(({ scrollTop, visibleHeight, totalHeight }) => {
            const scrollPosition = scrollTop + visibleHeight;
            const threshold = totalHeight * 0.75;
           if (hasMore && !loading && scrollPosition >= threshold && !isFetchingRef.current) {
                console.log("Reached the bottom of the grid, loading more photos", scrollPosition >= threshold);
                isFetchingRef.current = true;
                loadMore();
            }
            else{
                return ;
            }
        }, 300), // 300ms delay
        [ loadMore, loading]
    );

    useEffect(() => {
        if (!loading) {
            isFetchingRef.current = false;
        }
    }, [loading]);

    
    return (
        <div style={{ width: '100%', height: 'calc(100vh - 60px)', position: 'relative' }}>
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10
                }}>
                    <Loader />
                </div>
            )}
            <AutoSizer>
                {({ width, height }) => {
                    const columnWidth = Math.floor(width / COLUMN_COUNT);
                    return (
                        <Grid
                            columnCount={COLUMN_COUNT}
                            columnWidth={columnWidth}
                            width={width}
                            height={height}
                            rowCount={rowCount}
                            rowHeight={CARD_HEIGHT}
                            onScroll={({ scrollTop }) => {
                                const totalHeight = rowCount * CARD_HEIGHT;
                                const visibleHeight = height - 20;
                                handleScroll({ scrollTop, visibleHeight, totalHeight });
                            }}
                        >
                            {Cell}
                        </Grid>
                    );
                }}
            </AutoSizer>
            {!hasMore && !loading && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    textAlign: 'center',
                    padding: '16px',
                    background: 'rgba(255,255,255,0.85)',
                    fontWeight: 'bold',
                    color: '#888',
                    zIndex: 5
                }}>
                    No more photos to load.
                </div>
            )}
        </div>
    );
}
