import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface ArtGalleryProps {
    onOpenImage: (image: { title: string, url: string }) => void;
}

interface Drawing {
    id: string;
    title: string;
    url: string;
    source: 'local' | 'cloud';
    date: string;
}

const ArtGallery: React.FC<ArtGalleryProps> = ({ onOpenImage }) => {
    const [activeTab, setActiveTab] = useState<'local' | 'cloud'>('local');
    const [localDrawings, setLocalDrawings] = useState<Drawing[]>([]);
    const [cloudDrawings, setCloudDrawings] = useState<Drawing[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadLocalDrawings = () => {
        try {
            const stored = localStorage.getItem('local_drawings');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Map old format to new format if needed
                const mapped: Drawing[] = parsed.map((d: any) => ({
                    id: d.id,
                    title: d.label,
                    url: d.data,
                    source: 'local',
                    date: 'Local Save'
                }));
                setLocalDrawings(mapped.reverse()); // Newest first
            }
        } catch (err) {
            console.error('Failed to load local drawings', err);
        }
    };

    const loadCloudDrawings = async () => {
        if (!isSupabaseConfigured()) {
            setError("Supabase not configured");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('drawings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                const mapped: Drawing[] = data.map((d: any) => ({
                    id: d.id,
                    title: d.name || 'Untitled',
                    url: d.image_url,
                    source: 'cloud',
                    date: new Date(d.created_at).toLocaleDateString()
                }));
                setCloudDrawings(mapped);
            }
        } catch (err: any) {
            console.error('Failed to load cloud drawings', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLocalDrawings();
        if (activeTab === 'cloud') {
            loadCloudDrawings();
        }
    }, [activeTab]);

    const currentDrawings = activeTab === 'local' ? localDrawings : cloudDrawings;

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
            {/* Toolbar / Tabs */}
            <div style={{
                display: 'flex',
                gap: '4px',
                padding: '4px',
                background: '#c0c0c0',
                borderBottom: '1px solid #808080'
            }}>
                <button
                    style={{ fontWeight: activeTab === 'local' ? 'bold' : 'normal' }}
                    onClick={() => setActiveTab('local')}
                >
                    computer://local
                </button>
                <button
                    style={{ fontWeight: activeTab === 'cloud' ? 'bold' : 'normal' }}
                    onClick={() => setActiveTab('cloud')}
                >
                    http://cloud
                </button>
                {activeTab === 'cloud' && (
                    <button onClick={loadCloudDrawings} disabled={loading}>
                        ↻ Refresh
                    </button>
                )}
            </div>

            {/* Address Bar */}
            <div style={{ padding: '4px', borderBottom: '1px solid #000', fontSize: '12px' }}>
                Address: <span style={{ background: '#fff', border: '1px inset #ccc', padding: '1px 4px', width: '200px', display: 'inline-block' }}>
                    {activeTab === 'local' ? 'C:\\My Documents\\My Pictures' : 'cloud://drawings'}
                </span>
            </div>

            {/* Content Area */}
            <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '10px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '16px',
                alignContent: 'start'
            }}>
                {/* Error Message */}
                {error && activeTab === 'cloud' && (
                    <div style={{ gridColumn: '1/-1', color: 'red', padding: '10px' }}>
                        Error: {error}
                    </div>
                )}

                {/* Loading */}
                {loading && activeTab === 'cloud' && (
                    <div style={{ gridColumn: '1/-1', padding: '10px' }}>
                        Loading...
                    </div>
                )}

                {/* Empty State */}
                {!loading && currentDrawings.length === 0 && (
                    <div style={{ gridColumn: '1/-1', padding: '20px', textAlign: 'center', color: '#888' }}>
                        (No drawings found)
                    </div>
                )}

                {/* Items */}
                {currentDrawings.map(drawing => (
                    <div
                        key={drawing.id}
                        onClick={() => onOpenImage(drawing)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            width: '80px'
                        }}
                    >
                        <div style={{
                            width: '64px',
                            height: '64px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ccc',
                            background: '#eee',
                            marginBottom: '4px'
                        }}>
                            <img
                                src={drawing.url}
                                alt={drawing.title}
                                style={{ maxWidth: '60px', maxHeight: '60px', objectFit: 'contain' }}
                            />
                        </div>
                        <div style={{
                            fontSize: '11px',
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            maxWidth: '100%'
                        }}>
                            {drawing.title}
                        </div>
                    </div>
                ))}
            </div>

            {/* Status Bar */}
            <div style={{ padding: '2px 4px', background: '#c0c0c0', borderTop: '1px solid #808080', fontSize: '10px' }}>
                {currentDrawings.length} object(s)
            </div>
        </div>
    );
};

export default ArtGallery;
