import React, { useState, useEffect } from 'react'

import { Button, H1, H3, Paragraph, Separator, Text, XStack, YStack } from '@my/ui'
import { Home } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

export function LoginPage({ code, setCode }) {
  const [token, setToken] = useState('')

  const home = useLink({
    href: '/',
  })

  const clientID = '2b521e63e3ff470fadd0ad967629e3cf'
  const redirectURL = 'http://localhost:3000'
  const authEndPoint = 'https://accounts.spotify.com/authorize'
  const resType = 'token'
  const verifier = generateCodeVerifier(128)

  const getToken = () => {
    let urlParams = new URLSearchParams(window.location.hash.replace('#', '?'))
    let token = urlParams.get('access_token')
    return token
  }

  useEffect(() => {
    // challenge = generateCodeChallenge(verifier)
    localStorage.setItem('verifier', verifier)

    const hash = window.location.hash
    let accessToken = getToken()

    if (!token && hash) {
      accessToken = hash
        .substring(1)
        .split('&')
        .find((el) => el.startsWith('access_token'))
        .split('=')[1]
    }

    localStorage.setItem('access_token', accessToken)

    setToken(accessToken)
  }, [])
  console.log('token=', token)

  // if (code) {
  //   // const accessToken = getAccessToken(clientID, code).then((data) => console.log(data))
  //   // const profile = getProfile(accessToken)
  //   // console.log(profile)
  //   console.log('There is a code???')
  // }

  const generateCodeChallenge = async (codeVerifiers) => {
    const data = new TextEncoder().encode(codeVerifiers)
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\\/g, '_')
      .replace(/=+$/, '')
  }

  let challenge = generateCodeChallenge(verifier)
  let codeVerifier = generateCodeVerifier(128)
  console.log('challenge=', challenge)

  function redirectToAuthCodeFlow(clientID, challenge) {
    const params = new URLSearchParams()
    params.append('client_id', clientID)
    params.append('response_type', 'code')
    params.append('redirect_uri', 'http://localhost:3000')
    params.append('scope', 'user-read-private user-read-email')
    params.append('code_challenge_method', 'S256')
    params.append('code_challenge', challenge)

    // document.location =
    return `https://accounts.spotify.com/authorize?${params.toString()}`
  }

  function generateCodeVerifier(length) {
    let code = ''
    let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
      code += char.charAt(Math.floor(Math.random() * char.length))
    }

    return code
  }

  generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    let state = generateCodeVerifier(16)
    let scope = 'user-read-currently-playing user-top-read user-library-read'

    localStorage.setItem('code_verifier', codeVerifier)

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: clientID,
      scope: scope,
      redirect_uri: redirectURL,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    })

    // window.location
    return 'https://accounts.spotify.com/authorize?' + args
  })

  async function getProfile(token) {
    const result = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })

    return await result.json()
  }

  const spotifyLogin = useLink({
    // href: 'https://accounts.spotify.com/en/login',
    // href: redirectToAuthCodeFlow(clientID, challenge),
    href: `${authEndPoint}?client_id=${clientID}&redirect_uri=${redirectURL}&response_type=${resType}`,
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
