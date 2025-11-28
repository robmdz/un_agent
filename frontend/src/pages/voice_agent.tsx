import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useRoomContext,
  useLocalParticipant,
} from '@livekit/components-react';
import '@livekit/components-styles';
import Button from '../components/button';
import Modal from '../components/modal';
import '../styles/voice-agent.css';
import agentImage from '../assets/agent-orb.png';

/**
 * Barra de controles personalizada para la sala de LiveKit.
 * Permite silenciar el micrófono y desconectarse.
 */
const CustomControlBar = ({ onDisconnect }: { onDisconnect: () => void }) => {
  const room = useRoomContext();
  const { isMicrophoneEnabled, localParticipant } = useLocalParticipant();

  const toggleMicrophone = async () => {
    if (localParticipant) {
      const isMuted = !isMicrophoneEnabled;
      await localParticipant.setMicrophoneEnabled(isMuted);
    }
  };

  return (
    <div className="custom-control-bar">
      <button
        className={`control-button mic-button ${isMicrophoneEnabled ? 'active' : 'muted'}`}
        onClick={toggleMicrophone}
        title={isMicrophoneEnabled ? "Silenciar micrófono" : "Activar micrófono"}
      >
        {isMicrophoneEnabled ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
        )}
      </button>

      <button
        className="control-button disconnect-button"
        onClick={() => {
          room?.disconnect();
          onDisconnect();
        }}
        title="Desconectar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line></svg>
      </button>
    </div>
  );
};

/**
 * Visualizador del estado del agente.
 * Muestra una animación basada en el estado de conexión y actividad de voz.
 */
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
    room.on('connectionStateChanged', updateState);

    return () => {
      room.off('connected', updateState);
      room.off('disconnected', updateState);
      room.off('connectionStateChanged', updateState);
    };
  }, [room, isMicrophoneEnabled]);

  return (
    <div className="agent-content">
      <div className="visualizer-container">
        <div className={`agent-orb ${agentState}`}>
          <img src={agentImage} alt="UNparcero Agent" className="agent-image" />
        </div>
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

/**
 * Página principal del agente de voz.
 * Maneja la conexión con LiveKit, la obtención del token y la interfaz de usuario de la llamada.
 */
const VoiceAgent = () => {
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Mostrar el modal cuando el token está listo (usuario conectado)
      setShowModal(true);
    }
  }, [token]);

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
          <div className="agent-orb">
            <img src={agentImage} alt="UNparcero Agent" className="agent-image" />
          </div>
        </div>
        <h1 style={{ marginTop: '2rem', fontSize: '1.5rem' }}>Conectando con UNparcero...</h1>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="¡Bienvenido a UNparcero!"
      >
        <p>Cuando termines tu consulta, por favor presiona el botón rojo de <strong>'Desconectar'</strong> y llena el breve formulario de opinión para ayudarnos a mejorar.</p>
      </Modal>

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
            padding: '1.5rem 0',
            overflow: 'visible' // Asegurar que nada corte el contenido
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AgentVisualizer />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingBottom: '2.5rem' }}>
              <CustomControlBar onDisconnect={() => navigate('/form')} />
            </div>
          </div>
          <RoomAudioRenderer />
        </LiveKitRoom>
      </div>
    </div>
  );
};

export default VoiceAgent;
