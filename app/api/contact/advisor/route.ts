import { NextResponse } from 'next/server'
import { addAdvisorContact } from '@/lib/db'
import { verifyCaptcha } from '@/lib/captcha'

export async function POST(request: Request) {
  try {
    const { 
      name, 
      email, 
      phone, 
      company, 
      sector,
      interestArea,
      message, 
      captchaToken 
    } = await request.json()

    // Validar campos requeridos
    if (!name || !email || !phone || !interestArea || !message) {
      return NextResponse.json(
        { message: 'Todos los campos requeridos deben ser completados' },
        { status: 400 }
      )
    }

    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Email inválido' },
        { status: 400 }
      )
    }

    // Validar teléfono (formato básico)
    if (!/^\+?[\d\s-]{8,}$/.test(phone)) {
      return NextResponse.json(
        { message: 'Número de teléfono inválido' },
        { status: 400 }
      )
    }

    // Verificar captcha
    const captchaResult = await verifyCaptcha(captchaToken)
    if (!captchaResult.success) {
      return NextResponse.json(
        { message: captchaResult.error },
        { status: 400 }
      )
    }

    // Guardar contacto
    const result = await addAdvisorContact({
      name,
      email,
      phone,
      company,
      sector,
      interestArea,
      message,
      timestamp: new Date().toISOString()
    })

    if (!result.success) {
      throw new Error(result.error)
    }

    return NextResponse.json(
      { message: 'Solicitud de asesoría enviada exitosamente' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error en formulario de asesoría:', error)
    return NextResponse.json(
      { message: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
} 