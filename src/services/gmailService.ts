export interface GmailMessageItem {
  id: string;
  threadId: string;
  snippet?: string;
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
  internalDate?: string;
  labelIds?: string[];
  bodyHtml?: string;
  bodyText?: string;
}

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

// Helper to decode Base64 / Base64Url
function decodeBase64Url(input: string): string {
  try {
    const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return input;
  }
}

// Helper to encode Base64Url RFC 2822 email
function encodeBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function getGmailProfile(accessToken: string): Promise<GmailProfile> {
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al obtener perfil de Gmail');
  }
  return res.json();
}

export async function listGmailMessages(
  accessToken: string,
  query: string = '',
  maxResults: number = 10
): Promise<GmailMessageItem[]> {
  const url = new URL('https://gmail.googleapis.com/gmail/v1/users/me/messages');
  url.searchParams.set('maxResults', maxResults.toString());
  if (query) {
    url.searchParams.set('q', query);
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al listar mensajes de Gmail');
  }

  const data = await res.json();
  const rawList: { id: string; threadId: string }[] = data.messages || [];

  if (rawList.length === 0) return [];

  // Fetch top messages details in parallel (max 10 to be fast and avoid rate limiting)
  const detailPromises = rawList.slice(0, 10).map(async (item) => {
    try {
      const detailRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${item.id}?format=full`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!detailRes.ok) return { id: item.id, threadId: item.threadId };
      const detail = await detailRes.json();

      const headers = detail.payload?.headers || [];
      const getHeader = (name: string) =>
        headers.find((h: { name: string; value: string }) => h.name.toLowerCase() === name.toLowerCase())
          ?.value || '';

      const subject = getHeader('Subject') || '(Sin asunto)';
      const from = getHeader('From') || '(Remitente desconocido)';
      const to = getHeader('To') || '';
      const date = getHeader('Date') || '';

      // Extract body snippet or text
      let bodyText = detail.snippet || '';
      if (detail.payload?.parts) {
        for (const part of detail.payload.parts) {
          if (part.mimeType === 'text/plain' && part.body?.data) {
            bodyText = decodeBase64Url(part.body.data);
            break;
          }
        }
      } else if (detail.payload?.body?.data) {
        bodyText = decodeBase64Url(detail.payload.body.data);
      }

      return {
        id: detail.id,
        threadId: detail.threadId,
        snippet: detail.snippet || '',
        subject,
        from,
        to,
        date,
        internalDate: detail.internalDate,
        labelIds: detail.labelIds || [],
        bodyText,
      };
    } catch {
      return { id: item.id, threadId: item.threadId };
    }
  });

  return Promise.all(detailPromises);
}

export async function sendGmailMessage(
  accessToken: string,
  params: { to: string; subject: string; body: string }
): Promise<{ id: string; threadId: string }> {
  // Construct RFC 2822 compliant message
  const rawEmail = [
    `To: ${params.to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(params.subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    params.body,
  ].join('\r\n');

  const encoded = encodeBase64Url(rawEmail);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: encoded }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al enviar el correo con Gmail');
  }

  return res.json();
}

export async function deleteGmailMessage(
  accessToken: string,
  messageId: string
): Promise<void> {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al eliminar el correo de Gmail');
  }
}
