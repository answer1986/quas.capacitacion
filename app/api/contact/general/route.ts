import { NextResponse } from 'next/server'
import { addGeneralContact } from '@/lib/db'
import { verifyCaptcha } from '@/lib/captcha'

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, captchaToken } = await request.json()

    // Validar campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Todos los campos son requeridos' },
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

    // Verificar captcha
    const captchaResult = await verifyCaptcha(captchaToken)
    if (!captchaResult.success) {
      return NextResponse.json(
        { message: captchaResult.error },
        { status: 400 }
      )
    }

    // Guardar contacto
    const result = addGeneralContact({
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString()
    })

    if (!result.success) {
      throw new Error(result.error)
    }

    return NextResponse.json(
      { message: 'Mensaje enviado exitosamente' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error en formulario de contacto:', error)
    return NextResponse.json(
      { message: 'Error al procesar el formulario' },
      { status: 500 }
    )
  }
} 