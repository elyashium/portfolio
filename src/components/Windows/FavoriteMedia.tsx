import React, { useState } from 'react';
import { favoriteMedia, MediaCategory } from '../../data/favoriteMedia';

const FavoriteMedia: React.FC = () => {
  const [showExplore, setShowExplore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>(favoriteMedia[0]);

  if (showExplore) {
    return (
      <div style={{ 
        padding: '8px',
        height: '100%',
        overflow: 'auto'
      }}>
        {/* Back Button and Category Selector */}
        <div className="field-row" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowExplore(false)}
            style={{ 
              padding: '4px 8px',
              fontSize: '11px'
            }}
          >
            ← Back
          </button>
          
          <label htmlFor="category-select">Category:</label>
          <select
            id="category-select"
            value={selectedCategory.id}
            onChange={(e) => {
              const category = favoriteMedia.find(c => c.id === e.target.value);
              if (category) setSelectedCategory(category);
            }}
            style={{ width: '200px', marginLeft: '8px' }}
          >
            {favoriteMedia.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Display */}
        <div className="sunken-panel" style={{ padding: '16px' }}>
          {/* Category Title */}
          <h2 style={{ 
            margin: '0 0 16px 0',
            fontSize: '16px',
            fontWeight: 'bold',
            borderBottom: '1px solid #808080',
            paddingBottom: '4px'
          }}>
            {selectedCategory.icon} {selectedCategory.name}
          </h2>

          {/* Media Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth <= 768 
              ? 'repeat(2, 1fr)' 
              : 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
            marginTop: '16px'
          }}>
            {selectedCategory.items.map(item => (
              <div
                key={item.id}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'background-color 0.1s ease',
                  padding: '4px',
                  borderRadius: '2px'
                }}
                onClick={() => window.open(item.url, '_blank')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Image Placeholder */}
                <div style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '8px',
                  color: '#808080',
                  border: '1px solid #d0d0d0'
                }}>
                  {selectedCategory.icon}
                </div>
                
                {/* Title */}
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: '1.3',
                  color: '#000',
                  padding: '0 4px'
                }}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
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
           Ashish's Favorite Media
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
          A curated collection of my favorite music, movies, anime/manga and video games
        </p>

        <div style={{
          marginTop: '24px',
          padding: '12px',
          border: '2px inset #c0c0c0',
          background: '#f0f0f0',
          fontSize: '10px',
          textAlign: 'left'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Available Categories:</div>
          <div>🎵 Music Albums ({favoriteMedia.find(c => c.id === 'music')?.items.length || 0})</div>
          <div>📚 Anime/Manga ({favoriteMedia.find(c => c.id === 'anime-manga')?.items.length || 0})</div>
          <div>🎬 Cinema ({favoriteMedia.find(c => c.id === 'cinema')?.items.length || 0})</div>
          <div>🎮 Video Games ({favoriteMedia.find(c => c.id === 'video-games')?.items.length || 0})</div>
        </div>

        <button
          onClick={() => setShowExplore(true)}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '12px',
            fontWeight: 'bold',
            minWidth: '120px',
            cursor: 'pointer'
          }}
        >
          🔍 Explore Media
        </button>

        <p style={{ 
          fontSize: '10px',
          fontStyle: 'italic',
          color: '#999',
          marginTop: '16px'
        }}>
          "Click on any media item to visit its page"
        </p>
      </div>
    </div>
  );
};

export default FavoriteMedia;