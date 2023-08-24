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
