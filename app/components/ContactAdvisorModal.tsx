'use client'

import React, { useState, useEffect } from 'react'
import { X, Mail, Phone, User, Send, CheckCircle } from 'lucide-react'
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

interface ContactAdvisorModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormErrors {
  nombre?: string
  email?: string
  telefono?: string
}

const ContactAdvisorModalContent: React.FC<ContactAdvisorModalProps> = ({ isOpen, onClose }) => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Validaciones en tiempo real
    let newValue = value
    if (name === 'nombre') {
      // Solo permitir letras y espacios
      newValue = value.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ\s]/g, '')
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
      const token = await executeRecaptcha('advisorContactForm')
      
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
          telefono: ''
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
                <h3 className="text-2xl font-bold">Contactar con un Asesor</h3>
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
                  Hemos recibido tu solicitud. Un asesor se contactará contigo dentro de las próximas 24 horas.
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
const ContactAdvisorModal: React.FC<ContactAdvisorModalProps> = (props) => {
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
      <ContactAdvisorModalContent {...props} />
    </GoogleReCaptchaProvider>
  )
}

export default ContactAdvisorModal 