# Cómo Agregar las Fotos del Equipo

Este documento explica cómo agregar las fotos de los miembros del equipo en la página Team.

## Método 1: Agregar fotos a la carpeta assets (Recomendado)

### Paso 1: Guardar las imágenes
Guarda las 4 fotos del equipo en la carpeta `frontend/src/assets/` con nombres descriptivos, por ejemplo:
- `team-member-1.jpg`
- `team-member-2.jpg`
- `team-member-3.jpg`
- `team-member-4.jpg`

### Paso 2: Importar las imágenes en team.tsx

Agrega estos imports al inicio del archivo (después de la línea 1):

```typescript
import '../styles/team.css';
import member1Image from '../assets/team-member-1.jpg';
import member2Image from '../assets/team-member-2.jpg';
import member3Image from '../assets/team-member-3.jpg';
import member4Image from '../assets/team-member-4.jpg';
```

### Paso 3: Actualizar el array teamMembers

Reemplaza el valor de `image` en cada miembro:

```typescript
const teamMembers = [
  {
    id: 1,
    name: 'Juan Pérez',  // Actualiza con el nombre real
    role: 'Desarrollador Frontend',  // Actualiza con el rol real
    description: 'Especialista en React y diseño de interfaces.',  // Actualiza con la descripción real
    image: member1Image,  // Cambiado de null a la imagen importada
  },
  {
    id: 2,
    name: 'María González',
    role: 'Desarrolladora Backend',
    description: 'Experta en Python y bases de datos.',
    image: member2Image,
  },
  {
    id: 3,
    name: 'Carlos Ramírez',
    role: 'Diseñador UX/UI',
    description: 'Enfocado en crear experiencias de usuario memorables.',
    image: member3Image,
  },
  {
    id: 4,
    name: 'Ana Martínez',
    role: 'DevOps Engineer',
    description: 'Especialista en infraestructura y deployment.',
    image: member4Image,
  },
];
```

## Método 2: Usar URLs externas

Si prefieres usar URLs de imágenes hospedadas en línea:

```typescript
const teamMembers = [
  {
    id: 1,
    name: 'Juan Pérez',
    role: 'Desarrollador Frontend',
    description: 'Especialista en React y diseño de interfaces.',
    image: 'https://url-de-tu-imagen.com/foto1.jpg',
  },
  // ... resto de miembros
];
```

## Recomendaciones para las imágenes

### Tamaño y formato:
- **Formato:** JPG o PNG
- **Resolución recomendada:** 400x400 píxeles (mínimo 300x300)
- **Aspecto:** Cuadrado o retrato
- **Peso:** Menos de 500KB por imagen

### Optimización:
Para mejorar el rendimiento, puedes optimizar las imágenes usando:
- [TinyPNG](https://tinypng.com/) - Compresión de imágenes
- [Squoosh](https://squoosh.app/) - Herramienta de Google para optimizar imágenes

### Edición (opcional):
- Usa fondos consistentes o removidos
- Mantén un estilo uniforme entre todas las fotos
- Ajusta el brillo y contraste para que se vean bien

## Ejemplo Completo

Aquí está el código completo actualizado del archivo `team.tsx`:

```typescript
import '../styles/team.css';
import member1Image from '../assets/team-member-1.jpg';
import member2Image from '../assets/team-member-2.jpg';
import member3Image from '../assets/team-member-3.jpg';
import member4Image from '../assets/team-member-4.jpg';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Nombre Real',
      role: 'Desarrollador Frontend',
      description: 'Apasionado por crear interfaces intuitivas y accesibles.',
      image: member1Image,
    },
    {
      id: 2,
      name: 'Nombre Real',
      role: 'Desarrollador Backend',
      description: 'Especialista en arquitecturas escalables y APIs.',
      image: member2Image,
    },
    {
      id: 3,
      name: 'Nombre Real',
      role: 'Diseñador UX/UI',
      description: 'Creando experiencias centradas en el usuario.',
      image: member3Image,
    },
    {
      id: 4,
      name: 'Nombre Real',
      role: 'Ingeniero de IA',
      description: 'Trabajando con modelos de lenguaje y agentes conversacionales.',
      image: member4Image,
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
```

## Vista Previa

Mientras tanto, la página mostrará placeholders con iconos de usuario hasta que agregues las fotos reales.

¡Listo! Una vez agregues las fotos, la página se verá profesional y moderna. 🎉

