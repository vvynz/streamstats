import React, { useState } from 'react'

import { Button, H1, H3, Paragraph, Separator, Text, XStack, YStack } from '@my/ui'
import { Home } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

export function LoginPage() {
  const home = useLink({
    href: '/',
  })

  const spotifyLogin = useLink({
    href: 'https://accounts.spotify.com/en/login',
  })

  const newSpotifyAccount = useLink({
    href: 'https://www.spotify.com/en/signup',
  })

  return (
    <YStack>
      <XStack p="$4" jc="space-between" ai="baseline">
        <H1>stream stats</H1>
        <Button {...home} icon={Home}></Button>
      </XStack>
      <YStack ai="center" width="100%" maxWidth={500} space>
        <H3>Welcome to stream stats</H3>
        <Button bg="#00C354" borderRadius={30} {...spotifyLogin}>
          Login with Spotify
        </Button>
        <Separator alignSelf="stretch" marginVertical={15} borderColor="#ffffff" />
        <XStack ai="baseline">
          <Paragraph fontWeight="700">Don't have an account?</Paragraph>
          <Button {...newSpotifyAccount} backgroundColor="$backgroundTransparent" ml="$3">
            Sign up for Spotify
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}

const clientId = '2b521e63e3ff470fadd0ad967629e3cf'
const redirectUri = 'http://localhost:3000'
const params = new URLSearchParams(window.location.search)
const code = params.get('code')

if (!code) {
  redirectToAuthCodeFlow(clientId)
} else {
  const accessToken = await getAccessToken(clientId, code)
  const profile = await getProfile(accessToken)
  console.log(profile)
}

async function redirectToAuthCodeFlow(clientId: string) {
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

async function getAccessToken(clientId: string, code: string): Promise<string> {
  const codeVeri = localStorage.getItem('verifier')
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', redirectUri)
  params.append('code_verifier', codeVeri!)

  const response = fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })

  const { access_token } = await (await response).json()
  return access_token
}

async function getProfile(token: string): Promise<any> {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })

  return await result.json()
}
