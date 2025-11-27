import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
  useRoomContext,
  useLocalParticipant,
} from '@livekit/components-react';
import '@livekit/components-styles';
import Button from '../components/button';
import '../styles/voice-agent.css';

// Component to visualize agent status and connection
const AgentVisualizer = () => {
  const room = useRoomContext();
  const { isMicrophoneEnabled } = useLocalParticipant();
  const [agentState, setAgentState] = useState<'disconnected' | 'connected' | 'listening' | 'speaking'>('disconnected');

  useEffect(() => {
    if (!room) return;
    
    const updateState = () => {
      if (room.state === 'connected') {
        // Simple logic to determine state
        // In a real app, we would listen to agent's audio track activity
        setAgentState(isMicrophoneEnabled ? 'listening' : 'connected');
      } else {
        setAgentState('disconnected');
      }
    };

    updateState();
    room.on('connected', updateState);
    room.on('disconnected', updateState);
    room.on('stateChanged', updateState);

    return () => {
      room.off('connected', updateState);
      room.off('disconnected', updateState);
      room.off('stateChanged', updateState);
    };
  }, [room, isMicrophoneEnabled]);

  return (
    <div className="agent-content">
      <div className="visualizer-container">
        <div className={`agent-orb ${agentState}`}></div>
      </div>
      
      <div className="status-indicator">
        {agentState === 'disconnected' && 'Desconectado'}
        {agentState === 'connected' && 'En línea'}
        {agentState === 'listening' && 'Escuchando...'}
        {agentState === 'speaking' && 'Hablando...'}
      </div>
    </div>
  );
};

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
      <div className="page-container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <div className="visualizer-container">
            <div className="agent-orb"></div>
        </div>
        <h1 style={{ marginTop: '2rem', fontSize: '1.5rem' }}>Conectando con UNparcero...</h1>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="voice-agent-container">
        <LiveKitRoom
          video={false}
          audio={true}
          token={token}
          serverUrl={url}
          data-lk-theme="default"
          style={{ height: '100%', width: '100%' }}
          onDisconnected={() => navigate('/form')}
        >
          <div style={{ 
            position: 'relative', 
            zIndex: 2, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            padding: '2rem 0'
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <AgentVisualizer />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <VoiceAssistantControlBar />
            </div>
          </div>
          <RoomAudioRenderer />
        </LiveKitRoom>
      </div>
    </div>
  );
};

export default VoiceAgent;
