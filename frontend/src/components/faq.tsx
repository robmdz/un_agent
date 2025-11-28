import { useState } from 'react';
import '../styles/faq.css';

/**
 * Estructura de datos para un ítem de FAQ.
 */
interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "¿Qué es UNparcero?",
    answer: "UNparcero es tu asistente virtual de voz diseñado específicamente para la Universidad Nacional de Colombia, sede Medellín. Está aquí para ayudarte con información sobre ubicación, trámites académicos y dudas generales sobre la vida universitaria."
  },
  {
    question: "¿Cómo puedo interactuar con el agente?",
    answer: "Simplemente presiona el botón 'Hablar con UNparcero', concede permisos de micrófono y comienza a hablar naturalmente. El agente te escuchará y responderá a tus preguntas en tiempo real."
  },
  {
    question: "¿Qué tipo de preguntas puedo hacer?",
    answer: "Puedes preguntar sobre la ubicación de bloques y facultades, fechas del calendario académico, procesos de admisión, o servicios de bienestar universitario. ¡Intenta preguntar '¿Dónde queda el bloque 21?'!"
  },
  {
    question: "¿El servicio tiene algún costo?",
    answer: "No, UNparcero es una herramienta completamente gratuita desarrollada para el beneficio de la comunidad universitaria y visitantes."
  }
];

/**
 * Componente de Preguntas Frecuentes (FAQ).
 * Muestra una lista de preguntas desplegables.
 */
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
        <h2 className="faq-title">Preguntas Frecuentes</h2>
      </div>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleIndex(index)}
              aria-expanded={activeIndex === index}
            >
              <span>{item.question}</span>
              <span className="faq-icon"><span>+</span></span>
            </button>
            <div className="faq-answer">
              <div className="faq-answer-content">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

