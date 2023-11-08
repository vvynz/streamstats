import {
  Adapt,
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
  Select,
  Text,
  XStack,
  YStack,
  ZStack,
} from '@my/ui'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'

import React, { useState, useEffect } from 'react'
import { useLink } from 'solito/link'

//Components
import { UserIdHeader } from './id-header'
import { Overview } from '../overview/overview'
import { Search } from '../search/search'
import { useAuth } from './useAuth'
import axios from 'axios'
import { setSourceMapRange } from 'typescript'

export function Main({ code, clientID, redirectURL, user }) {
  const [accessToken, setAccessToken] = useState('')
  // const [user, setUser] = useState('RJ')
  const [verifier, setVerifier] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [artists, setArtists] = useState([])
  const [recentlyPlayed, setRecentlyPlayed] = useState([])

  // console.log('from main, AT=', accessToken)
  console.log('user data=', user)

  const linkProps = useLink({
    href: `/user/${user}`,
    // href: "/user/RJ"
  })

  const loginProps = useLink({
    href: '/login',
  })

  const logout = () => {
    setSourceMapRange('')
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
        q: searchVal,
        type: 'track',
      },
    })
    console.log(data)
    // setArtists(data.artists.items)
  }
  console.log(artists)

  const setFormChange = (inputValue) => {
    setSearchVal(inputValue)
  }

  useEffect(() => {
    setAccessToken(code)
    localStorage.setItem('access_token', accessToken)

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
        // console.log('res=', res.data.items.splice(10))
        setRecentlyPlayed(res.data.items.splice(10))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [accessToken])

  console.log(searchVal)

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
          <XStack alignItems="center" space="$3">
            <Input
              size="$4"
              defaultValue="Enter an artist"
              value={searchVal}
              onChange={(e) => setFormChange(e.target.value)}
            />
            <Button size="$4" onPress={searchArtist}>
              Go
            </Button>
          </XStack>
        </Form>
      </YStack>
      <Search artists={artists} />

      {/* <SheetDemo /> */}
    </YStack>
  )
}
