import { PERSONAL_INFO } from '../src/data/portfolioData';

interface ContactRequest {
  method?: string;
  body?: unknown;
}

interface ContactResponse {
  status: (code: number) => ContactResponse;
  json: (body: unknown) => void;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export default async function handler(req: ContactRequest, res: ContactResponse): Promise<void> {
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

  let upstream: Response;
  try {
    upstream = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload,
    });
  } catch (error: unknown) {
    console.error('No se pudo conectar con el servicio de correo del formulario.', error);
    res.status(502).json({ message: 'No se pudo conectar con el servicio de correo. Inténtalo de nuevo.' });
    return;
  }

  let result: unknown;
  try {
    result = await upstream.json();
  } catch (error: unknown) {
    console.error('El servicio de correo devolvió una respuesta no válida.', error);
    res.status(502).json({ message: 'El servicio de correo no pudo confirmar el envío. Inténtalo de nuevo.' });
    return;
  }

  const succeeded =
    isRecord(result) && (result.success === true || result.success === 'true');

  if (!upstream.ok || !succeeded) {
    res.status(502).json({ message: 'El servicio de correo no aceptó el mensaje. Inténtalo de nuevo.' });
    return;
  }

  res.status(200).json({ success: true });
}
