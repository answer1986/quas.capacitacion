'use client'

import React, { useState, useEffect } from 'react'
import { X, Mail, Phone, User, MessageCircle, BookOpen, Send, CheckCircle, Loader2 } from 'lucide-react'
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js'
import dynamic from 'next/dynamic'

// Importar ReCAPTCHA de forma dinámica
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
})

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

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, selectedCourse }) => {
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
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

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
    if (!formData.mensaje.trim()) {
      errors.mensaje = 'Por favor ingresa un mensaje'
    } else {
      const mensajeTrimmed = formData.mensaje.trim()
      if (mensajeTrimmed.length < 10) {
        errors.mensaje = 'El mensaje debe tener al menos 10 caracteres'
      } else if (mensajeTrimmed.length > 500) {
        errors.mensaje = 'El mensaje no puede exceder los 500 caracteres'
      } else if (!/^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s.,;:¿?¡!@#$%&*()-_]{10,500}$/.test(mensajeTrimmed)) {
        errors.mensaje = 'El mensaje contiene caracteres no permitidos'
      }
    }

    // Validación del captcha
    if (!captchaToken) {
      errors.mensaje = 'Por favor completa el captcha'
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
    setSubmitError(null)
    
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
    setSubmitError(null)
    
    // Limpiar error cuando el usuario empieza a escribir
    if (formErrors.telefono) {
      setFormErrors(prev => ({ ...prev, telefono: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          phone: formData.telefono,
          company: formData.empresa,
          courseInterest: formData.curso,
          message: formData.mensaje,
          captchaToken,
          timestamp: new Date().toISOString()
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar el formulario')
      }
      
      setIsSubmitting(false)
      setIsSubmitted(true)
      setCaptchaToken(null)

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
      setSubmitError(error instanceof Error ? error.message : 'Error al enviar el formulario')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-t-2xl p-6 sm:p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">Solicitar Información</h3>
                <p className="text-primary-100 mt-2 text-lg">Te contactaremos a la brevedad</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h4>
                <p className="text-gray-600">Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                      placeholder="Nombre y Apellido"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      formErrors.nombre ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  </div>
                  {formErrors.nombre && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.nombre}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                      placeholder="Email"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handlePhoneChange}
                      placeholder="+56 9 XXXX XXXX"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      formErrors.telefono ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  </div>
                  {formErrors.telefono && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.telefono}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                      placeholder="Empresa (opcional)"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      formErrors.empresa ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  </div>
                  {formErrors.empresa && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.empresa}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                  <select
                    name="curso"
                    value={formData.curso}
                    onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                      formErrors.curso ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white`}
                  >
                    <option value="">Selecciona un curso</option>
                    {cursos.map((curso, index) => (
                        <option key={index} value={curso}>{curso}</option>
                    ))}
                  </select>
                  </div>
                  {formErrors.curso && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.curso}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                      placeholder="Mensaje"
                      rows={5}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      formErrors.mensaje ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none`}
                  />
                  </div>
                  {formErrors.mensaje && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.mensaje}</p>
                  )}
                </div>

                <div className="flex justify-center">
                  {typeof window !== 'undefined' && (
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                      onChange={(token) => {
                        setCaptchaToken(token)
                        setFormErrors(prev => ({ ...prev, mensaje: undefined }))
                      }}
                    />
                  )}
                </div>

                {submitError && (
                  <div className="text-center text-red-500 text-sm">
                    {submitError}
                  </div>
                )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensaje
                      </>
                    )}
                  </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactModal 