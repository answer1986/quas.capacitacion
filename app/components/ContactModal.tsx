'use client'

import React, { useState, useEffect } from 'react'
import { X, Mail, Phone, User, MessageCircle, BookOpen, Send, CheckCircle } from 'lucide-react'
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  selectedCourse?: string
}

const cursos = [
  'Aplicación De Técnicas Para Implementación De Un Sistema HACCP',
  'Herramientas De Excel Básico Aplicadas A La Gestión Laboral', 
  'Formación De Auditores Internos En Sistemas De Gestión Integrados Trinorma ISO 9001-14001-45001',
  'Aplicación De Plan De Aseguramiento De La Calidad PAC',
  'Técnicas De Gestión De Riesgos Operacionales'
]

interface FormErrors {
  nombre?: string
  email?: string
  telefono?: string
  empresa?: string
  curso?: string
  mensaje?: string
}

const ContactModalContent: React.FC<ContactModalProps> = ({ isOpen, onClose, selectedCourse }) => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    curso: selectedCourse || '',
    mensaje: ''
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (selectedCourse) {
      setFormData(prev => ({ ...prev, curso: selectedCourse }))
    }
  }, [selectedCourse])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    
    // Validación del nombre
    const nombreTrimmed = formData.nombre.trim()
    const nombreRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]{2,50}$/
    if (!nombreRegex.test(nombreTrimmed)) {
      errors.nombre = 'El nombre debe contener solo letras y espacios (2-50 caracteres)'
    } else if (nombreTrimmed.split(' ').length < 2) {
      errors.nombre = 'Por favor ingresa tu nombre y apellido'
    }
    
    // Validación del email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Por favor ingresa un correo electrónico válido'
    }
    
    // Validación del teléfono
    try {
      const phoneNumber = parsePhoneNumberFromString(formData.telefono, 'CL')
      if (!phoneNumber || !isValidPhoneNumber(formData.telefono, 'CL')) {
        errors.telefono = 'Por favor ingresa un número de teléfono chileno válido (+56 9 XXXX XXXX)'
      }
    } catch (error) {
      errors.telefono = 'Por favor ingresa un número de teléfono válido'
    }

    // Validación de empresa
    if (formData.empresa.trim()) {
      const empresaRegex = /^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s.,-]{2,100}$/
      if (!empresaRegex.test(formData.empresa.trim())) {
        errors.empresa = 'El nombre de la empresa debe tener entre 2 y 100 caracteres válidos'
      }
    }

    // Validación del curso
    if (!formData.curso) {
      errors.curso = 'Por favor selecciona un curso'
    } else if (!cursos.includes(formData.curso)) {
      errors.curso = 'Por favor selecciona un curso válido'
    }

    // Validación del mensaje
    if (formData.mensaje.trim()) {
      const mensajeTrimmed = formData.mensaje.trim()
      if (mensajeTrimmed.length < 10) {
        errors.mensaje = 'El mensaje debe tener al menos 10 caracteres'
      } else if (mensajeTrimmed.length > 500) {
        errors.mensaje = 'El mensaje no puede exceder los 500 caracteres'
      } else if (!/^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s.,;:¿?¡!@#$%&*()-_]{10,500}$/.test(mensajeTrimmed)) {
        errors.mensaje = 'El mensaje contiene caracteres no permitidos'
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Validaciones en tiempo real
    let newValue = value
    switch (name) {
      case 'nombre':
        // Solo permitir letras y espacios
        newValue = value.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ\s]/g, '')
        break
      case 'empresa':
        // Permitir letras, números y algunos caracteres especiales
        newValue = value.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s.,-]/g, '')
        break
      case 'mensaje':
        // Limitar a 500 caracteres
        newValue = value.slice(0, 500)
        break
    }

    setFormData(prev => ({ ...prev, [name]: newValue }))
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const formatPhoneNumber = (value: string): string => {
    // Eliminar todos los caracteres no numéricos
    const numbers = value.replace(/\D/g, '')
    
    // Formatear el número según el patrón chileno
    if (numbers.length <= 9) {
      return numbers
        .replace(/(\d{1})/, '+56 9 $1')
        .replace(/(\d{4})(\d{4})$/, '$1 $2')
    }
    
    return numbers
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value)
    setFormData(prev => ({ ...prev, telefono: formattedNumber }))
    
    // Limpiar error cuando el usuario empieza a escribir
    if (formErrors.telefono) {
      setFormErrors(prev => ({ ...prev, telefono: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (!executeRecaptcha) {
      console.error('Execute recaptcha not yet available')
      return
    }

    setIsSubmitting(true)

    try {
      // Verificar reCAPTCHA
      const token = await executeRecaptcha('contactForm')
      
      // Aquí iría la lógica de envío del formulario al backend
      // incluyendo el token de reCAPTCHA para verificación
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Resetear después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          empresa: '',
          curso: '',
          mensaje: ''
        })
      }, 3000)
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-t-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Solicitar Información</h3>
                <p className="text-primary-100 mt-1">Te contactaremos a la brevedad</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h4>
                <p className="text-gray-600">
                  Hemos recibido tu solicitud. Nos contactaremos contigo dentro de las próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                      formErrors.nombre ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ingresa tu nombre y apellido"
                  />
                  {formErrors.nombre && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.nombre}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handlePhoneChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                      formErrors.telefono ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+56 9 XXXX XXXX"
                  />
                  {formErrors.telefono && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.telefono}</p>
                  )}
                </div>

                {/* Empresa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa u Organización
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                      formErrors.empresa ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nombre de tu empresa (opcional)"
                  />
                  {formErrors.empresa && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.empresa}</p>
                  )}
                </div>

                {/* Curso */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    Curso de Interés *
                  </label>
                  <select
                    name="curso"
                    value={formData.curso}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                      formErrors.curso ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona un curso</option>
                    {cursos.map((curso, index) => (
                      <option key={index} value={curso}>
                        {curso}
                      </option>
                    ))}
                  </select>
                  {formErrors.curso && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.curso}</p>
                  )}
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Mensaje Adicional
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none ${
                      formErrors.mensaje ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Cuéntanos más sobre tus necesidades de capacitación..."
                  />
                  {formErrors.mensaje && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.mensaje}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.mensaje.length}/500 caracteres
                  </p>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Solicitud
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente envoltorio con el provider de reCAPTCHA
const ContactModal: React.FC<ContactModalProps> = (props) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="TU_CLAVE_PUBLICA_RECAPTCHA"
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <ContactModalContent {...props} />
    </GoogleReCaptchaProvider>
  )
}

export default ContactModal 