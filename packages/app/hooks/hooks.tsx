export function redirectToAuthCodeFlow(clientId: string) {
  const verifier = ''
  const challenge = ''
}

function generateCodeVerifier(length: number) {
  let code = ''
  let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    code += char.charAt(Math.floor(Math.random() * char.length))
  }

  return code
}

async function generateCodeChallenge(codeVerifiers: string) {
  const data = new TextEncoder().encode(codeVerifiers)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\\/g, '_')
    .replace(/=+$/, '')
}
