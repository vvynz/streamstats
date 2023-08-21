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
    <>
      <XStack p="$4" jc="space-between" ai="baseline">
        <H1>stream stats</H1>
        <Button {...home} icon={Home}></Button>
      </XStack>
      <YStack width="100%" maxWidth={500} ai="center" space>
        <H3>Welcome to stream stats</H3>
        <Button bg="#00C354" borderRadius={30} {...spotifyLogin}>
          Login with Spotify
        </Button>
        <Separator alignSelf="stretch" marginVertical={15} borderColor="#ffffff" />
        <XStack ai="baseline">
          <Paragraph fontWeight="700">Don't have an account?</Paragraph>
          <Button {...newSpotifyAccount} backgroundColor="$backgroundTransparent">
            Sign up for Spotify
          </Button>
        </XStack>
      </YStack>
    </>
  )
}
