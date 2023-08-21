import React, { useState } from 'react'

import { Button, H1, H3, Text, XStack, YStack } from '@my/ui'
import { Home } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

export function LoginPage() {
  const home = useLink({
    href: '/',
  })

  const spotifyLink = useLink({
    href: 'https://accounts.spotify.com/en/login?continue=https%3A%2F%2Fopen.spotify.com%2F',
  })
  return (
    <>
      <XStack p="$4" jc="space-between" ai="baseline">
        <H1>stream stats</H1>
        <Button {...home} icon={Home}></Button>
      </XStack>
      <YStack ai="center" space>
        <H3>Welcome to stream stats</H3>
        <Button bg="#00C354" borderRadius={30} {...spotifyLink}>
          Login with Spotify
        </Button>
      </YStack>
    </>
  )
}
