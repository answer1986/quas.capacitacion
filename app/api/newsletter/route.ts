import { NextResponse } from 'next/server'
import { addSubscriber, checkEmailExists } from '@/lib/db'

async function verifyCaptcha(token: string) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  })

  const data = await response.json()
  return data.success
}

export async function POST(request: Request) {
  try {
    const { email, captchaToken, timestamp } = await request.json()

    // Validar email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Email inválido' },
        { status: 400 }
      )
    }

    // Verificar captcha
    const isValidCaptcha = await verifyCaptcha(captchaToken)
    if (!isValidCaptcha) {
      return NextResponse.json(
        { message: 'Verificación de captcha fallida' },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    if (checkEmailExists(email)) {
      return NextResponse.json(
        { message: 'Este email ya está suscrito' },
        { status: 400 }
      )
    }

    // Insertar nuevo suscriptor
    const result = addSubscriber(email, timestamp)

    if (!result.success) {
      throw new Error(result.error)
    }

    return NextResponse.json(
      { message: 'Suscripción exitosa' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error en suscripción al newsletter:', error)
    return NextResponse.json(
      { message: 'Error al procesar la suscripción' },
      { status: 500 }
    )
  }
} 