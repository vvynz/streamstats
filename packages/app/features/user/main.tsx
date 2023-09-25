import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  Text,
  XStack,
  YStack,
  ZStack,
} from '@my/ui'

import React, { useState } from 'react'
import { useLink } from 'solito/link'

//Components
import { UserIdHeader } from './id-header'
import { Overview } from '../overview/overview'

export function Main({ code, clientID, redirectURL }) {
  const [user, setUser] = useState('RJ')
  const [accessToken, setAccessToken] = useState('')

  const linkProps = useLink({
    href: '/user/RJ',
  })

  const loginProps = useLink({
    href: '/login',
  })

  // console.log('code=', code)
  async function getAccessToken(clientID: string, code: string): Promise<string> {
    const codeVeri = localStorage.getItem('verifier')
    const params = new URLSearchParams()
    params.append('client_id', clientID)
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', redirectURL)
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

  return (
    <YStack f={1} p="$4" space>
      <XStack jc="space-between">
        <H1>Stream Stats</H1>
        <XStack>
          {user ? (
            <Button {...linkProps}>Go to User</Button>
          ) : (
            <Button {...loginProps}>Login</Button>
          )}
          {/* <Link href={`/user/RJ`} text="Login" /> */}
        </XStack>
      </XStack>

      <XStack jc="center" ai="center" space>
        <UserIdHeader />
      </XStack>

      <Overview />

      {/* <SheetDemo /> */}
    </YStack>
  )
}
