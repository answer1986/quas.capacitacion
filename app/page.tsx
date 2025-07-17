'use client'

import React, { useEffect, useState } from 'react'
import { BookOpen, Users, Award, CheckCircle, Star, ArrowRight, Sparkles, Target, TrendingUp, Menu, X } from 'lucide-react'
import Image from 'next/image'
import FloatingElements from './components/FloatingElements'
import ContactModal from './components/ContactModal'
import ContactAdvisorModal from './components/ContactAdvisorModal'
import AboutModal from './components/AboutModal'
import NewsletterForm from './components/NewsletterForm'

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
    color: "from-green-400 to-emerald-600",
    sence: true
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
    color: "from-blue-400 to-cyan-600",
    sence: true
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
    color: "from-purple-400 to-violet-600",
    sence: false
  },
  {
    id: 4,
    titulo: "Aplicación De Plan De Aseguramiento De La Calidad PAC",
    descripcion: "Desarrolla e implementa planes efectivos de aseguramiento de la calidad en tu organización. Curso aprobado por MINVU con años de experiencia en su dictación.",
    duracion: "32 horas",
    modalidad: "Presencial/Virtual",
    nivel: "Intermedio",
    icono: <Star className="w-8 h-8 text-yellow-500" />,
    categoria: "Calidad",
    color: "from-yellow-400 to-orange-600",
    sence: true,
    certificacion: "MINVU"
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
    color: "from-red-400 to-rose-600",
    sence: true
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

      {/* Plataforma Virtual Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/50 to-purple-50/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/20 to-purple-100/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16 fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Plataforma Virtual de Última Generación
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Aprende desde <span className="gradient-text">Cualquier Lugar</span>
            </h3>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra plataforma virtual de capacitación te permite acceder a contenidos de alta calidad, 
              participar en cursos interactivos y obtener certificaciones reconocidas desde la comodidad de tu hogar u oficina.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            <div className="fade-in-up">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/50">
                <Image 
                  src="/images/aprenderonline.png"
                  alt="Plataforma Virtual de Capacitación"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
            
            <div className="fade-in-up" style={{animationDelay: '0.2s'}}>
              <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tecnología Educativa Avanzada
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Acceso 24/7</h5>
                    <p className="text-gray-600">Estudia a tu ritmo, cuando y donde quieras</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Interacción en Tiempo Real</h5>
                    <p className="text-gray-600">Sesiones en vivo con instructores expertos</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Certificaciones Válidas</h5>
                    <p className="text-gray-600">Certificados reconocidos por la industria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modalidades de Cursos */}
          <div className="fade-in-up">
            <div className="text-center mb-12">
              <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Modalidades de <span className="gradient-text">Capacitación</span>
              </h4>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ofrecemos diversas alternativas para adaptarnos a tus necesidades y las de tu organización
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Cursos Sincrónicos</h5>
                <p className="text-gray-600 text-sm">Clases en tiempo real con interacción directa</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Cursos Asincrónicos</h5>
                <p className="text-gray-600 text-sm">Aprende a tu propio ritmo y horario</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Con Código SENCE</h5>
                <p className="text-gray-600 text-sm">Capacitación financiada por el Estado</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/50">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Cursos a Medida</h5>
                <p className="text-gray-600 text-sm">Diseñados específicamente para tu empresa</p>
              </div>
            </div>
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
                      {curso.sence && (
                        <div className="flex items-center text-xs md:text-sm text-gray-500">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 md:mr-3"></div>
                          <span className="font-medium">Código SENCE:</span> Disponible
                        </div>
                      )}
                      {curso.certificacion && (
                        <div className="flex items-center text-xs md:text-sm text-green-600 font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 md:mr-3"></div>
                          <span className="font-medium">Aprobado por:</span> {curso.certificacion}
                        </div>
                      )}
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
      <section id="nosotros" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-200 to-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200 to-primary-200 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Dos Empresas, Una Visión Integral
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">Consultoría</span> y <span className="gradient-text">OTEC</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Somos dos empresas complementarias que trabajan en sinergia para ofrecer soluciones integrales. 
              Nuestra OTEC se potencia con la experiencia y profundidad técnica de nuestra consultora.
            </p>
          </div>

          {/* Dos Empresas Complementarias */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Consultoría */}
            <div className="fade-in-up">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Consultoría</h3>
                    <p className="text-gray-600">Especialistas en Transformación Organizacional</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Certificación ISO</h4>
                      <p className="text-gray-600 text-sm">Implementación y certificación de normas ISO 9001, 14001, 45001</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Consultoría de Procesos</h4>
                      <p className="text-gray-600 text-sm">Optimización y mejora continua de procesos organizacionales</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Desarrollo de Software</h4>
                      <p className="text-gray-600 text-sm">Soluciones tecnológicas personalizadas para empresas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* OTEC */}
            <div className="fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">OTEC</h3>
                    <p className="text-gray-600">Organismo Técnico de Capacitación</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Capacitación Especializada</h4>
                      <p className="text-gray-600 text-sm">Cursos con profundidad técnica respaldada por nuestra consultoría</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Metodologías Innovadoras</h4>
                      <p className="text-gray-600 text-sm">Enfoques pedagógicos basados en experiencia real de consultoría</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Certificaciones Reconocidas</h4>
                      <p className="text-gray-600 text-sm">Validadas por organismos oficiales y la industria</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experiencia Sectorial */}
          <div className="mb-16 fade-in-up">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Experiencia en <span className="gradient-text">Ambos Sectores</span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Más de 15 años trabajando tanto en el sector público como privado, 
                adaptando nuestras soluciones a las necesidades específicas de cada entorno.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-blue-900">Sector Público</h4>
                </div>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Ministerios y servicios públicos
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Municipalidades y gobiernos regionales
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Empresas públicas y autónomas
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Instituciones educacionales públicas
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-green-900">Sector Privado</h4>
                </div>
                <ul className="space-y-3 text-green-800">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Grandes empresas y corporaciones
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    PYMES y empresas familiares
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Startups y empresas innovadoras
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Organizaciones sin fines de lucro
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Estadísticas actualizadas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 fade-in-up">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-white/50">
              <div className="text-primary-600 text-4xl font-bold mb-2">15+</div>
              <div className="text-gray-800 font-semibold mb-1">Años de Experiencia</div>
              <p className="text-gray-600 text-sm">Consolidada en ambos sectores</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-white/50">
              <div className="text-primary-600 text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-800 font-semibold mb-1">Profesionales Capacitados</div>
              <p className="text-gray-600 text-sm">En sector público y privado</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-white/50">
              <div className="text-primary-600 text-4xl font-bold mb-2">98%</div>
              <div className="text-gray-800 font-semibold mb-1">Satisfacción</div>
              <p className="text-gray-600 text-sm">Avalada por participantes</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-white/50">
              <div className="text-primary-600 text-4xl font-bold mb-2">2</div>
              <div className="text-gray-800 font-semibold mb-1">Empresas Integradas</div>
              <p className="text-gray-600 text-sm">Consultoría + OTEC</p>
            </div>
          </div>

          <div className="text-center mt-12 fade-in-up">
            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Conoce Nuestra Historia Completa
            </button>
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
              <NewsletterForm />
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