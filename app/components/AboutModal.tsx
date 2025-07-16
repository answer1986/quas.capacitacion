'use client'

import React from 'react'
import { X } from 'lucide-react'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl">
          {/* Pergamino */}
          <div 
            className="bg-[#f4e4bc] rounded-lg shadow-2xl transform transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundImage: `
                radial-gradient(#d4b48c 1px, transparent 1px),
                radial-gradient(#d4b48c 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
              boxShadow: `
                0 0 10px rgba(139, 69, 19, 0.1),
                0 0 20px rgba(139, 69, 19, 0.1),
                inset 0 0 30px rgba(139, 69, 19, 0.2)
              `
            }}
          >
            {/* Bordes decorativos del pergamino */}
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#d4b48c] to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#d4b48c] to-transparent opacity-60"></div>
            <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-[#d4b48c] to-transparent opacity-60"></div>
            <div className="absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-[#d4b48c] to-transparent opacity-60"></div>
            
            {/* Contenido */}
            <div className="relative p-12">
              {/* Botón de cerrar estilizado */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#8b4513] text-[#f4e4bc] hover:bg-[#5c2e0e] transition-colors duration-200 shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-6 text-[#4a3520]">
                <h2 className="text-4xl font-serif font-bold mb-8 text-center text-[#8b4513] border-b-2 border-[#8b4513] pb-4 px-8">
                  QUAS: Expertos en Mejora de Procesos y Formación de Alto Nivel
                </h2>

                <div className="space-y-6 font-serif">
                  <p className="leading-relaxed text-lg">
                    En QUAS Consultora, nos especializamos en optimizar procesos, implementar normas ISO y fortalecer la gestión organizacional para empresas que buscan excelencia operativa. Con más de 15 años de experiencia, hemos consolidado un equipo multidisciplinario de consultores que combinan conocimiento técnico y metodologías innovadoras para entregar soluciones a medida.
                  </p>

                  <p className="leading-relaxed text-lg">
                    Nuestro compromiso con la calidad nos impulsó a crear QUAS Capacitación, un espacio dedicado a la Formación Profesional de Excelencia. Aquí, profesionales y organizaciones acceden a cursos especializados diseñados para desarrollar competencias en gestión, calidad, seguridad y herramientas técnicas, siempre bajo estándares internacionales.
                  </p>

                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-[#8b4513] mb-6 text-center">
                      ¿Por Qué Elegirnos?
                    </h3>
                    <ul className="space-y-4 max-w-3xl mx-auto">
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-[#8b4513] rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <span className="text-lg"><strong>Experiencia Validada:</strong> Más de 500 profesionales capacitados en 25+ cursos especializados.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-[#8b4513] rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <span className="text-lg"><strong>Metodología Práctica:</strong> Cursos basados en casos reales y herramientas aplicables desde el primer día.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-[#8b4513] rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <span className="text-lg"><strong>Flexibilidad:</strong> Modalidades presenciales y virtuales, adaptadas a tus necesidades.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-[#8b4513] rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <span className="text-lg"><strong>Resultados Tangibles:</strong> El 98% de satisfacción de nuestros participantes refleja nuestro enfoque en calidad y valor.</span>
                      </li>
                    </ul>
                  </div>

                  <p className="mt-8 text-xl font-medium text-[#8b4513] italic text-center px-8">
                    "En QUAS, no solo impartimos conocimiento; transformamos prácticas profesionales para impulsar tu crecimiento y el de tu organización."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutModal 