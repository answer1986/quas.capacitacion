'use client'

import React, { useEffect, useState } from 'react'
import { BookOpen, Users, Award, CheckCircle, Star, ArrowRight, Sparkles, Target, TrendingUp, Menu, X } from 'lucide-react'
import Image from 'next/image'
import FloatingElements from './components/FloatingElements'
import ContactModal from './components/ContactModal'
import ContactAdvisorModal from './components/ContactAdvisorModal'
import AboutModal from './components/AboutModal'

const cursos = [
  {
    id: 1,
    titulo: "Aplicación De Técnicas Para Implementación De Un Sistema HACCP",
    descripcion: "Aprende a implementar un sistema de Análisis de Peligros y Puntos Críticos de Control para garantizar la seguridad alimentaria.",
    duracion: "40 horas",
    modalidad: "Presencial/Virtual",
    nivel: "Intermedio",
    icono: <CheckCircle className="w-8 h-8 text-green-500" />,
    categoria: "Seguridad Alimentaria",
    color: "from-green-400 to-emerald-600"
  },
  {
    id: 2,
    titulo: "Herramientas De Excel Básico Aplicadas A La Gestión Laboral",
    descripcion: "Domina las herramientas fundamentales de Excel para optimizar la gestión y administración de recursos humanos.",
    duracion: "24 horas",
    modalidad: "Virtual",
    nivel: "Básico",
    icono: <BookOpen className="w-8 h-8 text-blue-500" />,
    categoria: "Gestión",
    color: "from-blue-400 to-cyan-600"
  },
  {
    id: 3,
    titulo: "Formación De Auditores Internos En Sistemas De Gestión Integrados Trinorma ISO 9001-14001-45001",
    descripcion: "Conviértete en auditor interno especializado en sistemas integrados de calidad, medio ambiente y seguridad laboral.",
    duracion: "60 horas",
    modalidad: "Presencial",
    nivel: "Avanzado",
    icono: <Award className="w-8 h-8 text-purple-500" />,
    categoria: "Auditoría",
    color: "from-purple-400 to-violet-600"
  },
  {
    id: 4,
    titulo: "Aplicación De Plan De Aseguramiento De La Calidad PAC",
    descripcion: "Desarrolla e implementa planes efectivos de aseguramiento de la calidad en tu organización.",
    duracion: "32 horas",
    modalidad: "Presencial/Virtual",
    nivel: "Intermedio",
    icono: <Star className="w-8 h-8 text-yellow-500" />,
    categoria: "Calidad",
    color: "from-yellow-400 to-orange-600"
  },
  {
    id: 5,
    titulo: "Técnicas De Gestión De Riesgos Operacionales",
    descripcion: "Identifica, evalúa y gestiona riesgos operacionales para minimizar impactos en tu organización.",
    duracion: "36 horas",
    modalidad: "Virtual",
    nivel: "Intermedio",
    icono: <TrendingUp className="w-8 h-8 text-red-500" />,
    categoria: "Gestión de Riesgos",
    color: "from-red-400 to-rose-600"
  }
]

const stats = [
  { icon: <Users className="w-8 h-8" />, number: "500+", label: "Profesionales Capacitados" },
  { icon: <Award className="w-8 h-8" />, number: "15+", label: "Años de Experiencia" },
  { icon: <Target className="w-8 h-8" />, number: "98%", label: "Satisfacción del Cliente" },
  { icon: <Sparkles className="w-8 h-8" />, number: "25+", label: "Cursos Especializados" }
]

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el))

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const openModal = (course?: string) => {
    setSelectedCourse(course || '')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCourse('')
  }

  const scrollToCursos = () => {
    const cursosSection = document.getElementById('cursos')
    if (cursosSection) {
      cursosSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Effects */}
      <FloatingElements />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Mouse follower effect */}
      <div 
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`
        }}
      ></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div>
              <Image 
                src="/images/logo-capacitacion.png" 
                alt="Quas Capacitación" 
                width={160} 
                height={140}
                className="w-[120px] h-[100px] md:w-[140px] md:h-[110px] lg:w-[130px] lg:h-[70px]" 
              />
              <p className="text-gray-600 mt-1 text-sm md:text-base">Excelencia en formación profesional</p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={scrollToCursos}
                className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105"
              >
                Cursos
              </button>
              <button 
                onClick={() => {
                  const nosotrosSection = document.getElementById('nosotros')
                  if (nosotrosSection) {
                    nosotrosSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105"
              >
                Nosotros
              </button>
              <button 
                onClick={() => openModal()}
                className="btn-primary"
              >
                Contacto
              </button>
            </div>
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

             {/* Mobile menu */}
       {isMobileMenuOpen && (
         <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
           <div className="bg-white w-full max-w-sm ml-auto h-full p-6 shadow-2xl">
             <div className="flex justify-between items-center mb-8">
               <div>
                 <Image 
                   src="/images/logo-capacitacion.png" 
                   alt="Quas Capacitación" 
                   width={160} 
                   height={140}
                   className="w-[100px] h-[80px]" 
                 />
                 <p className="text-gray-600 mt-1 text-xs">Excelencia en formación profesional</p>
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-primary-600 p-2">
                 <X className="w-6 h-6" />
               </button>
             </div>
             <nav className="space-y-6">
               <button 
                 onClick={() => {
                   scrollToCursos()
                   setIsMobileMenuOpen(false)
                 }}
                 className="block w-full text-left text-lg text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 py-3 border-b border-gray-100"
               >
                 Cursos
               </button>
               <button 
                 onClick={() => {
                   const nosotrosSection = document.getElementById('nosotros')
                   if (nosotrosSection) {
                     nosotrosSection.scrollIntoView({ behavior: 'smooth' })
                   }
                   setIsMobileMenuOpen(false)
                 }}
                 className="block w-full text-left text-lg text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 py-3 border-b border-gray-100"
               >
                 Nosotros
               </button>
               <button 
                 onClick={() => {
                   openModal()
                   setIsMobileMenuOpen(false)
                 }}
                 className="btn-primary w-full mt-6"
               >
                 Contacto
               </button>
             </nav>
           </div>
         </div>
       )}

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 hero-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="fade-in-up text-center lg:text-left">
              <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
                <Sparkles className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                Formación Profesional de Excelencia
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Capacitación <span className="gradient-text">Profesional</span>
                <br />
                <span className="text-2xl md:text-4xl lg:text-5xl">de Alto Nivel</span>
              </h2>
              <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed px-4 lg:px-0">
                Desarrolla tus habilidades con nuestros cursos especializados en gestión, 
                calidad, seguridad y herramientas técnicas. Formación de calidad para profesionales exigentes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 px-4 lg:px-0">
                <button 
                  onClick={scrollToCursos}
                  className="btn-primary text-base md:text-lg pulse-glow"
                >
                  Ver Cursos
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5 ml-2 inline" />
                </button>
                <button 
                  onClick={() => openModal()}
                  className="btn-secondary text-base md:text-lg"
                >
                  Más Información
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="fade-in-up relative" style={{animationDelay: '0.2s'}}>
              <div className="scene">
                <div className="cube">
                  {/* Cara frontal */}
                  <div className="cube-face cube-face-front">
                    <img 
                      src="/images/capacitacion-hero.webp"
                      alt="Capacitación profesional en Quas"
                      className="cube-image"
                    />
                  </div>

                  {/* Cara derecha */}
                  <div className="cube-face cube-face-right">
                    <img 
                      src="/images/aprenderonline.png"
                      alt="Aprendizaje online en Quas"
                      className="cube-image"
                    />
                  </div>

                  {/* Cara trasera */}
                  <div className="cube-face cube-face-back">
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center p-8">
                        <h3 className="text-2xl font-bold text-primary-700">Formación de Excelencia</h3>
                      </div>
                    </div>
                  </div>

                  {/* Cara izquierda */}
                  <div className="cube-face cube-face-left">
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-primary-100 flex items-center justify-center">
                      <div className="text-center p-8">
                        <h3 className="text-2xl font-bold text-primary-700">Calidad Garantizada</h3>
                      </div>
                    </div>
                  </div>

                  {/* Cara superior */}
                  <div className="cube-face cube-face-top">
                    <div className="w-full h-full bg-gradient-to-br from-primary-50 to-purple-50"></div>
                  </div>

                  {/* Cara inferior */}
                  <div className="cube-face cube-face-bottom">
                    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-primary-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="glass-card p-4 md:p-6 hover:bg-white/20 transition-all duration-300 group">
                  <div className="text-primary-600 mb-2 md:mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="scale-75 md:scale-100">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-xs md:text-sm font-medium leading-tight">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative" id="cursos">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 fade-in-up">
            <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Award className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
              Nuestros Cursos Especializados
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Explora Nuestra <span className="gradient-text">Oferta Educativa</span>
            </h3>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4 lg:px-0">
              Cursos diseñados por expertos para impulsar tu carrera profesional con las últimas metodologías y estándares internacionales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cursos.map((curso, index) => (
              <div key={curso.id} className="fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="card p-4 md:p-8 h-full group cursor-pointer relative overflow-hidden">
                  {/* Background gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${curso.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4 md:mb-6">
                      <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        <div className="scale-75 md:scale-100">
                          {curso.icono}
                        </div>
                      </div>
                      <span className="bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 text-xs font-medium px-2 md:px-3 py-1 md:py-2 rounded-full border border-primary-200/50">
                        {curso.categoria}
                      </span>
                    </div>
                    
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight group-hover:text-primary-700 transition-colors duration-300">
                      {curso.titulo}
                    </h4>
                    
                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                      {curso.descripcion}
                    </p>
                    
                    <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      <div className="flex items-center text-xs md:text-sm text-gray-500">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mr-2 md:mr-3"></div>
                        <span className="font-medium">Duración:</span> {curso.duracion}
                      </div>
                      <div className="flex items-center text-xs md:text-sm text-gray-500">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 md:mr-3"></div>
                        <span className="font-medium">Modalidad:</span> {curso.modalidad}
                      </div>
                      <div className="flex items-center text-xs md:text-sm text-gray-500">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 md:mr-3"></div>
                        <span className="font-medium">Nivel:</span> {curso.nivel}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => openModal(curso.titulo)}
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 md:py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center group-hover:shadow-lg transform group-hover:scale-105 text-sm md:text-base"
                    >
                      Más Información
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl floating-animation"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl floating-animation" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="fade-in-up">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Transforma tu Futuro Profesional
            </div>
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              ¿Listo para <span className="text-yellow-300">impulsar</span> tu carrera?
            </h3>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Únete a miles de profesionales que han transformado su carrera con nuestros cursos especializados y metodologías innovadoras
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => openModal()}
                className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Inscríbete Ahora
              </button>
              <button 
                onClick={() => setIsAdvisorModalOpen(true)}
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:border-white"
              >
                Contactar Asesor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Nosotros */}
      <section id="nosotros" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sobre Nosotros
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Más de 15 años de experiencia transformando organizaciones a través de la consultoría y capacitación de alto nivel.
            </p>
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Conoce Nuestra Historia
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-primary-600 text-4xl font-bold mb-2">15+</div>
              <div className="text-gray-800 font-semibold">Años de Experiencia</div>
              <p className="text-gray-600 mt-2">Trayectoria comprobada en consultoría y capacitación.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-primary-600 text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-800 font-semibold">Profesionales Capacitados</div>
              <p className="text-gray-600 mt-2">Impactando positivamente en su desarrollo profesional.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-primary-600 text-4xl font-bold mb-2">98%</div>
              <div className="text-gray-800 font-semibold">Satisfacción</div>
              <p className="text-gray-600 mt-2">Nuestros participantes avalan la calidad de nuestros servicios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="fade-in-up">
              <Image src="/images/logo-capacitacion.png" alt="Quas Capacitación" width={160} height={140} />
              <p className="text-gray-400 leading-relaxed mb-6">
                Formación profesional de excelencia para el desarrollo de competencias especializadas y el crecimiento profesional continuo.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  <span className="text-sm font-bold">Li</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  <span className="text-sm font-bold">Fb</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  <span className="text-sm font-bold">Ig</span>
                </div>
              </div>
            </div>
            <div className="fade-in-up" style={{animationDelay: '0.1s'}}>
              <h5 className="text-xl font-semibold mb-6 text-primary-400">Contacto</h5>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center hover:text-white transition-colors duration-300">
                  <span className="mr-3">📧</span>
                  <span>info@quas.cl</span>
                </div>
                <div className="flex items-center hover:text-white transition-colors duration-300">
                  <span className="mr-3">📱</span>
                  <span>+56 9 1234 5678</span>
                </div>
                <div className="flex items-center hover:text-white transition-colors duration-300">
                  <span className="mr-3">📍</span>
                  <span>Santiago, Región Metropolitana, Metro Universidad Chile</span>
                </div>
              </div>
            </div>
            <div className="fade-in-up" style={{animationDelay: '0.2s'}}>
              <h5 className="text-xl font-semibold mb-6 text-primary-400">Newsletter</h5>
              <p className="text-gray-400 mb-4">Recibe las últimas novedades sobre nuestros cursos</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="flex-1 px-4 py-3 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-primary-500"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-r-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300">
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Quas Capacitación. Todos los derechos reservados.</p>
            <p>Desde 2015 apoyando a la empresa Chilena.</p>
          </div>
        </div>
      </footer>

      {/* Modales */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        selectedCourse={selectedCourse}
      />
      <ContactAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  )
} 