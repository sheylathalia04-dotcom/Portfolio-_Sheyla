const isRecord = (value) => typeof value === 'object' && value !== null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Método no permitido.' });
    return;
  }

  const body = req.body;
  if (
    !isRecord(body) ||
    typeof body.nombre !== 'string' ||
    typeof body.email !== 'string' ||
    typeof body.asunto !== 'string' ||
    typeof body.mensaje !== 'string'
  ) {
    res.status(400).json({ message: 'Completa los datos del formulario e inténtalo de nuevo.' });
    return;
  }

  const { nombre, email, asunto, mensaje } = body;
  if (!nombre.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !mensaje.trim()) {
    res.status(400).json({ message: 'Revisa el nombre, el correo y el mensaje.' });
    return;
  }

  const payload = new URLSearchParams({
    name: nombre,
    email,
    _subject: asunto.trim() || `Contacto desde el portfolio: ${nombre}`,
    _captcha: 'false',
    message: mensaje,
  });

  let upstream;
  try {
    upstream = await fetch('https://formsubmit.co/ajax/sheylathalia04@gmail.com', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload,
    });
  } catch (error) {
    console.error('No se pudo conectar con el servicio de correo del formulario.', error);
    res.status(502).json({ message: 'No se pudo conectar con el servicio de correo. Inténtalo de nuevo.' });
    return;
  }

  let result;
  try {
    result = await upstream.json();
  } catch (error) {
    console.error('El servicio de correo devolvió una respuesta no válida.', error);
    res.status(502).json({ message: 'El servicio de correo no pudo confirmar el envío. Inténtalo de nuevo.' });
    return;
  }

  const succeeded = isRecord(result) && (result.success === true || result.success === 'true');
  if (!upstream.ok || !succeeded) {
    res.status(502).json({ message: 'El servicio de correo no aceptó el mensaje. Inténtalo de nuevo.' });
    return;
  }

  res.status(200).json({ success: true });
}
