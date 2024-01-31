import React, { useState, useEffect } from 'react'

import { Button, H1, H3, Paragraph, Separator, Text, XStack, YStack } from '@my/ui'
import { Home } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

export function LoginPage({ code, setCode }) {
  const [token, setToken] = useState('')

  const clientID = '2b521e63e3ff470fadd0ad967629e3cf'
  const redirectURL = 'http://localhost:3000'
  const authEndPoint = 'https://accounts.spotify.com/authorize'
  const resType = 'token'
  const scope = 'user-read-private user-read-email user-read-recently-played user-top-read'

  const getToken = () => {
    let urlParams = new URLSearchParams(window.location.hash.replace('#', '?'))
    let token = urlParams.get('access_token')
    return token
  }

  useEffect(() => {
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

  const spotifyLogin = useLink({
    href: `${authEndPoint}?client_id=${clientID}&redirect_uri=${redirectURL}&response_type=${resType}&scope=${scope}`,
  })

  const newSpotifyAccount = useLink({
    href: 'https://www.spotify.com/en/signup',
  })

  return (
    <YStack>
      <XStack p="$4" jc="space-between" ai="baseline">
        <H1>stream stats</H1>
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
