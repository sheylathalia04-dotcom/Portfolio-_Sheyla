export interface GoogleDocFile {
  id: string;
  name: string;
  modifiedTime?: string;
  webViewLink?: string;
  iconLink?: string;
  owners?: { displayName?: string; emailAddress?: string }[];
}

export interface GoogleDocDetail {
  documentId: string;
  title: string;
  revisionId?: string;
  plainText: string;
}

export async function listGoogleDocs(accessToken: string): Promise<GoogleDocFile[]> {
  const query = encodeURIComponent("mimeType = 'application/vnd.google-apps.document' and trashed = false");
  const fields = encodeURIComponent('files(id, name, modifiedTime, webViewLink, iconLink, owners)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&orderBy=modifiedTime%20desc&pageSize=20`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al listar documentos de Google Drive/Docs');
  }

  const data = await res.json();
  return data.files || [];
}

export async function getGoogleDocContent(
  accessToken: string,
  documentId: string
): Promise<GoogleDocDetail> {
  const url = `https://docs.googleapis.com/v1/documents/${documentId}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al obtener el contenido del documento');
  }

  const doc = await res.json();
  let fullText = '';

  if (doc.body?.content) {
    for (const elem of doc.body.content) {
      if (elem.paragraph?.elements) {
        for (const pElem of elem.paragraph.elements) {
          if (pElem.textRun?.content) {
            fullText += pElem.textRun.content;
          }
        }
      }
    }
  }

  return {
    documentId: doc.documentId,
    title: doc.title,
    revisionId: doc.revisionId,
    plainText: fullText.trim(),
  };
}

export async function createGoogleDoc(
  accessToken: string,
  title: string
): Promise<{ documentId: string; title: string }> {
  const url = 'https://docs.googleapis.com/v1/documents';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al crear el documento en Google Docs');
  }

  return res.json();
}

export async function appendTextToGoogleDoc(
  accessToken: string,
  documentId: string,
  text: string
): Promise<void> {
  const url = `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            endOfSegmentLocation: {},
            text: '\n' + text + '\n',
          },
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al agregar texto al documento de Google Docs');
  }
}
