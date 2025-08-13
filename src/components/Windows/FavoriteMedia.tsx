import React from 'react';

const FavoriteMedia: React.FC = () => {
  return (
    <div style={{ 
      padding: '16px',
      textAlign: 'center',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="sunken-panel" style={{ 
        padding: '32px',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{ 
          margin: '0 0 16px 0',
          fontSize: '16px',
          color: '#800080'
        }}>
          🎵 My Favorite Media
        </h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          margin: '20px 0',
          fontSize: '32px'
        }}>
          <span>🎵</span>
          <span>🎬</span>
          <span>📚</span>
          <span>🎮</span>
        </div>

        <p style={{ 
          fontSize: '11px',
          lineHeight: '1.4',
          margin: '16px 0',
          color: '#666'
        }}>
          A curated collection of my favorite music, movies, books, and games is on its way!
        </p>

        <div style={{
          marginTop: '24px',
          padding: '12px',
          border: '2px inset #c0c0c0',
          background: '#f0f0f0',
          fontSize: '10px',
          textAlign: 'left'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Coming Soon:</div>
          <div>🎧 Coding Playlist</div>
          <div>🎥 Tech Documentaries</div>
          <div>📖 Programming Books</div>
          <div>🎮 Indie Games Collection</div>
        </div>

        <p style={{ 
          fontSize: '10px',
          fontStyle: 'italic',
          color: '#999',
          marginTop: '16px'
        }}>
          "Good code is like good music - it has rhythm, structure, and beauty."
        </p>
      </div>
    </div>
  );
};

export default FavoriteMedia;