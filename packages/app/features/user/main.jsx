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

export function Main({ code, clientID, redirectURL }) {
  const [accessToken, setAccessToken] = useState('')
  const [user, setUser] = useState([
    {
      id: '',
      images: [],
    },
  ])
  const [verifier, setVerifier] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [artists, setArtists] = useState([])
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [topMonthlyList, setTopMonthlyList] = useState([])
  const [error, setError] = useState('')

  // console.log('from main, AT=', accessToken)
  // console.log('user data=', user)

  const linkProps = useLink({
    href: `/user/${user.id}`,
    // href: '/user/RJ',
  })

  const loginProps = useLink({
    href: '/login',
  })

  const getUser = async () => {
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${code}` },
    })

    setUser(data)
  }

  const logout = () => {
    setUser('')
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
        type: 'artist',
      },
    })

    if (!searchVal) {
      setError('Please enter an artist!')
    }

    console.log(data)
    setArtists(data.artists.items)
  }
  console.log(artists)

  const setFormChange = (inputValue) => {
    setSearchVal(inputValue)
  }

  const getRecentlyPlayedList = async () => {
    await axios
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
  }

  const getTopMonthlyList = async () => {
    await axios
      .get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        // console.log('top monthly =', res.data)
        setTopMonthlyList(res.data.items)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    setAccessToken(code)
    localStorage.setItem('access_token', accessToken)

    let codeVerifier

    codeVerifier = localStorage.getItem('verifier')
    console.log('verifier=', codeVerifier)

    setVerifier(codeVerifier)

    getUser()
    getRecentlyPlayedList()
    getTopMonthlyList()
  }, [accessToken])

  console.log(topMonthlyList)

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
        <UserIdHeader code={code} user={user} />
      </XStack>

      <Overview recentlyPlayed={recentlyPlayed} topMonthlyList={topMonthlyList} />
      <Button onPress={(e) => searchArtist(e)}>Search</Button>
      <YStack>
        <Form>
          <Label htmlFor="">Search:</Label>
          {error ? <Text>{error}</Text> : null}
          <XStack alignItems="center" space="$3">
            <Input size="$4" value={searchVal} onChange={(e) => setFormChange(e.target.value)} />
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
