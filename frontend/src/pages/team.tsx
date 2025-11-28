import '../styles/team.css';

/**
 * Página del equipo.
 * Muestra información sobre los desarrolladores del proyecto.
 */
const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Nombre del Miembro 1',
      role: 'Rol / Especialidad',
      description: 'Breve descripción del miembro del equipo y su contribución al proyecto.',
      image: null, // Placeholder para la foto
    },
    {
      id: 2,
      name: 'Nombre del Miembro 2',
      role: 'Rol / Especialidad',
      description: 'Breve descripción del miembro del equipo y su contribución al proyecto.',
      image: null, // Placeholder para la foto
    },
    {
      id: 3,
      name: 'Nombre del Miembro 3',
      role: 'Rol / Especialidad',
      description: 'Breve descripción del miembro del equipo y su contribución al proyecto.',
      image: null, // Placeholder para la foto
    },
    {
      id: 4,
      name: 'Nombre del Miembro 4',
      role: 'Rol / Especialidad',
      description: 'Breve descripción del miembro del equipo y su contribución al proyecto.',
      image: null, // Placeholder para la foto
    },
  ];

  return (
    <div className="page-container">
      <div className="team-header">
        <h1 className="team-title">Nuestro Equipo</h1>
        <p className="team-subtitle">
          Conoce a las personas detrás de UNparcero, trabajando para hacer tu experiencia
          en la Universidad Nacional más fácil y agradable.
        </p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <div className="team-card-image">
              {member.image ? (
                <img src={member.image} alt={member.name} />
              ) : (
                <div className="image-placeholder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
            </div>
            <div className="team-card-content">
              <h3 className="team-card-name">{member.name}</h3>
              <p className="team-card-role">{member.role}</p>
              <p className="team-card-description">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

