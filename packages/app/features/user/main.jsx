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
  const accessToken = useAuth(code)
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

  // console.log('code=', code)
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

  const logout = () => {}

  const searchArtist = async () => {
    // e.preventDefault()

    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${code}`,
      },
      params: {
        q: 'Jungkook',
        type: 'artist',
      },
    })
    setArtists(data)
  }
  console.log(artists)

  useEffect(() => {
    let codeVerifier
    window.addEventListener('scroll', () => {})

    codeVerifier = localStorage.getItem('verifier')
    console.log('verifier=', codeVerifier)

    setVerifier(codeVerifier)

    const token = getAccessToken(clientID, code)
    console.log(token)
  }, [])

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
      <Button onPress={() => searchArtist()}>Search</Button>

      {/* <SheetDemo /> */}
    </YStack>
  )
}
