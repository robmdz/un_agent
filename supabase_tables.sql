-- Tabla para almacenar feedback de usuarios
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  use_chatbot VARCHAR(10) NOT NULL CHECK (use_chatbot IN ('yes', 'no')),
  ease_of_use VARCHAR(10) NOT NULL CHECK (ease_of_use IN ('easy', 'hard')),
  understanding VARCHAR(10) NOT NULL CHECK (understanding IN ('yes', 'no')),
  guidance VARCHAR(10) NOT NULL CHECK (guidance IN ('yes', 'no')),
  clarity VARCHAR(10) NOT NULL CHECK (clarity IN ('yes', 'no')),
  satisfaction INTEGER NOT NULL CHECK (satisfaction >= 1 AND satisfaction <= 5),
  improvements TEXT,
  other_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Índices para mejorar el rendimiento de consultas
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX idx_feedback_satisfaction ON feedback(satisfaction);

-- Tabla para almacenar registros de usuarios
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'admin', 'visitor')),
  interests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Índices para mejorar el rendimiento de consultas
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_role ON registrations(role);

-- Política de seguridad de Row Level Security (RLS)
-- Habilitar RLS en ambas tablas
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT público (cualquiera puede enviar feedback)
CREATE POLICY "Enable insert for all users" ON feedback
  FOR INSERT WITH CHECK (true);

-- Política para permitir INSERT público (cualquiera puede registrarse)
CREATE POLICY "Enable insert for all users" ON registrations
  FOR INSERT WITH CHECK (true);

-- Política para permitir SELECT solo para usuarios autenticados (opcional)
-- Descomentar si quieres restringir la lectura solo a usuarios autenticados
-- CREATE POLICY "Enable read access for authenticated users only" ON feedback
--   FOR SELECT USING (auth.role() = 'authenticated');

-- CREATE POLICY "Enable read access for authenticated users only" ON registrations
--   FOR SELECT USING (auth.role() = 'authenticated');

-- Comentarios sobre las tablas
COMMENT ON TABLE feedback IS 'Almacena las respuestas del formulario de retroalimentación de usuarios';
COMMENT ON TABLE registrations IS 'Almacena los registros de usuarios interesados en nuevas versiones';

