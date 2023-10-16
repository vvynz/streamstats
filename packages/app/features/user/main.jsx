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

import React, { useState, useEffect } from 'react'
import { useLink } from 'solito/link'

//Components
import { UserIdHeader } from './id-header'
import { Overview } from '../overview/overview'
import { useAuth } from './useAuth'
import axios from 'axios'

export function Main({ code, clientID, redirectURL }) {
  const [accessToken, setAccessToken] = useState('')
  const [user, setUser] = useState('RJ')
  const [verifier, setVerifier] = useState('')
  const [artists, setArtists] = useState([])

  console.log('from main, AT=', accessToken)

  const linkProps = useLink({
    href: '/user/RJ',
  })

  const loginProps = useLink({
    href: '/login',
  })

  async function getAccessToken(clientID, code) {
    const params = new URLSearchParams()
    params.append('client_id', clientID)
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', redirectURL)
    params.append('code_verifier', verifier)

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

  const logout = () => {
    setVerifier('')
    window.localStorage.removeItem('verifier')
  }

  const searchArtist = async (e) => {
    e.preventDefault()

    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: 'Jungkook',
        type: 'artist',
      },
    })
    setArtists(data.artists)
  }
  console.log(artists)

  useEffect(() => {
    setAccessToken(code)
    let codeVerifier
    window.addEventListener('scroll', () => {})

    codeVerifier = localStorage.getItem('verifier')
    console.log('verifier=', codeVerifier)

    setVerifier(codeVerifier)
  }, [])

  return (
    <YStack f={1} p="$4" space>
      <XStack jc="space-between">
        <H1>Stream Stats</H1>
        <XStack>
          {user ? (
            <XStack>
              <Button {...linkProps}>Go to User</Button>
              <Button onPress={() => logout()} {...loginProps}>
                Logout
              </Button>
            </XStack>
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
      <Button onPress={(e) => searchArtist(e)}>Search</Button>

      {/* <SheetDemo /> */}
    </YStack>
  )
}
