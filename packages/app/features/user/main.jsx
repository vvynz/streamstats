import {
  Anchor,
  Button,
  Form,
  H1,
  H3,
  Input,
  Label,
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
import { Search } from '../search/search'
import { useAuth } from './useAuth'
import axios from 'axios'

export function Main({ code, clientID, redirectURL }) {
  const [accessToken, setAccessToken] = useState('')
  const [user, setUser] = useState('RJ')
  const [verifier, setVerifier] = useState('')
  const [artists, setArtists] = useState([])
  const [recentlyPlayed, setRecentlyPlayed] = useState([])

  // console.log('from main, AT=', accessToken)

  const linkProps = useLink({
    href: '/user/RJ',
  })

  const loginProps = useLink({
    href: '/login',
  })

  const logout = () => {
    setAccessToken('')
    window.localStorage.removeItem('access_token')
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
    setArtists(data.artists.items)
  }
  console.log(artists)

  const getUser = async () => {
    const { res } = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    setUser(res)
  }
  console.log('user', user)

  useEffect(() => {
    setAccessToken(code)

    let codeVerifier
    // window.addEventListener('scroll', () => {})

    codeVerifier = localStorage.getItem('verifier')
    console.log('verifier=', codeVerifier)

    setVerifier(codeVerifier)
  }, [accessToken])

  useEffect(() => {
    if (!recentlyPlayed) return
    axios
      .get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log('res=', res)
        setRecentlyPlayed(res.data.items)
      })
      .catch((err) => {})
  }, [accessToken])

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

      <Overview recentlyPlayed={recentlyPlayed} />
      <Button onPress={(e) => searchArtist(e)}>Search</Button>
      <YStack>
        <Form>
          <Label htmlFor="">Search:</Label>
          <Input size="$3" defaultValue="Enter an artist" />
        </Form>
      </YStack>
      <Search artists={artists} />

      {/* <SheetDemo /> */}
    </YStack>
  )
}
