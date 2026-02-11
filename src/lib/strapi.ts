const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchStrapi(path: string, params?: Record<string, string>) {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const res = await fetch(url.toString(), {
      headers,
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Strapi fetch error: ${res.status} ${res.statusText} for ${url}`);
      return null;
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Strapi connection error for ${path}:`, error);
    return null;
  }
}

export async function fetchStrapiSingle(path: string) {
  return fetchStrapi(path, { 'populate': '*' });
}

export async function fetchStrapiCollection(path: string, params?: Record<string, string>) {
  return fetchStrapi(path, { 'populate': '*', ...params });
}

export async function postStrapi(path: string, data: Record<string, unknown>) {
  const url = `${STRAPI_URL}/api${path}`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error(`POST failed: ${res.status}`);
  return res.json();
}

export function getStrapiMedia(url?: string | null): string {
  if (!url) return '/logo.png';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
