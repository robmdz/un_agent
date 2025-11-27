import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
} from '@livekit/components-react';
import '@livekit/components-styles';

const VoiceAgent = () => {
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8000/getToken');
        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }
        const data = await response.json();
        setToken(data.token);
        setUrl(data.url);
      } catch (e) {
        console.error(e);
        setError('No se pudo conectar con el servidor. Asegúrate de que el backend esté corriendo en el puerto 8000.');
      }
    })();
  }, []);

  if (error) {
      return (
        <div className="page-container" style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'var(--color-secondary)' }}>Error de Conexión</h1>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      );
  }

  if (token === '') {
    return (
      <div className="page-container" style={{ textAlign: 'center' }}>
        <h1>Conectando con UNparcero...</h1>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '600px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px solid var(--color-secondary)', borderRadius: '12px', padding: '2rem', backgroundColor: 'rgba(0,0,0,0.05)' }}>
        <LiveKitRoom
          video={false}
          audio={true}
          token={token}
          serverUrl={url}
          data-lk-theme="default"
          style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onDisconnected={() => navigate('/form')}
        >
          <RoomAudioRenderer />
          <VoiceAssistantControlBar />
        </LiveKitRoom>
      </div>
    </div>
  );
};

export default VoiceAgent;
