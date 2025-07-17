'use client'

import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import { Loader2 } from 'lucide-react'

interface NewsletterFormProps {
  className?: string
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!captchaToken) {
      setMessage('Por favor, completa el captcha')
      setStatus('error')
      return
    }

    try {
      setStatus('loading')
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          captchaToken,
          timestamp: new Date().toISOString()
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('¡Gracias por suscribirte!')
        setEmail('')
        setCaptchaToken(null)
      } else {
        throw new Error(data.message || 'Error al suscribirse')
      }
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Error al suscribirse')
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email" 
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-primary-500 transition-colors duration-200"
            required
          />
          
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              onChange={(token) => setCaptchaToken(token)}
              theme="dark"
            />
          </div>
          
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Enviando...
              </>
            ) : 'Suscribirse'}
          </button>
        </div>

        {message && (
          <div className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  )
} 