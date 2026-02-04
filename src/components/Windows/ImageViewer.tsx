import React from 'react';

interface ImageViewerProps {
    image: {
        title: string;
        url: string;
    } | null;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ image }) => {
    if (!image) return <div style={{ padding: '20px' }}>No image selected</div>;

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#c0c0c0',
            overflow: 'hidden'
        }}>
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                <img
                    src={image.url}
                    alt={image.title}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        border: '2px inset white',
                        boxShadow: '2px 2px 5px rgba(0,0,0,0.5)'
                    }}
                />
            </div>
        </div>
    );
};

export default ImageViewer;
