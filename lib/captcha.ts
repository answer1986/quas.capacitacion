export async function verifyCaptcha(token: string) {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    return { success: data.success, error: data.success ? null : 'Verificación de captcha fallida' }
  } catch (error) {
    return { success: false, error: 'Error al verificar el captcha' }
  }
} 