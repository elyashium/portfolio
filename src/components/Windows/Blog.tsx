import React from 'react';

const Blog: React.FC = () => {
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
          color: '#000080'
        }}>
          📝 Developer Blog
        </h2>
        
        <div style={{
          fontSize: '48px',
          margin: '16px 0',
          color: '#808080'
        }}>
          🚧
        </div>

        <p style={{ 
          fontSize: '11px',
          lineHeight: '1.4',
          margin: '16px 0',
          color: '#666'
        }}>
          Under construction. The latest ramblings and technical insights are coming soon!
        </p>

        <p style={{ 
          fontSize: '10px',
          fontStyle: 'italic',
          color: '#999',
          marginTop: '24px'
        }}>
          Expected topics: React patterns, TypeScript tips, web performance, and developer productivity.
        </p>

        <div style={{
          marginTop: '20px',
          padding: '8px',
          background: '#ffffc0',
          border: '1px solid #e0e000',
          fontSize: '10px'
        }}>
          💡 Pro tip: Check back soon for insights from the development trenches!
        </div>
      </div>
    </div>
  );
};

export default Blog;