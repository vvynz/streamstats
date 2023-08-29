export function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128)
  const challenge = await generateCodeChallenge(verifier)

  localStorage.setItem('verifier', verifier)

  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('response_type', 'code')
  params.append('redirect_uri', 'http://localhost:3000')
  params.append('scope', 'user-read-private user-read-email')
  params.append('code_challenge_method', 'S256')
  params.append('code_challenge', challenge)

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
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

const clientId = '2b521e63e3ff470fadd0ad967629e3cf'
const redirectUri = 'http://localhost:3000'

let codeVerifier = generateCodeVerifier(128)

generateCodeChallenge(codeVerifier).then((codeChallenge) => {
  let state = generateCodeVerifier(16)
  let scope = 'user-read-currently-playing user-top-read user-library-read'

  localStorage.setItem('code_verifier', codeVerifier)

  let args = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  })

  window.location = 'https://accounts.spotify.com/authorize?' + args
})

const urlParams = new URLSearchParams(window.location.search)
let code = urlParams.get('code')
