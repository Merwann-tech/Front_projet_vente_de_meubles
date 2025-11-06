"use client";
const url = process.env.NEXT_PUBLIC_URL;


export async function checkTokenRole(token: string): Promise<'none' | 'user' | 'moderator' | 'admin'> {
  try {
    const res = await fetch(`${url}/token`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return 'none'; // cas token invalide ou 401

    const data = await res.json();
    if (data.message.includes('admin')) return 'admin';
    if (data.message.includes('moderator')) return 'moderator';
    if (data.message.includes('valid')) return 'user';
    return 'none';
  } catch (error) {
    return 'none';
  }
}