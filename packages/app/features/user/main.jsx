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
import { Check, ChevronDown, ChevronUp, Home } from '@tamagui/lucide-icons'

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

  const home = useLink({
    href: '/',
  })

  const linkProps = useLink({
    href: `/user/${user.id}`,
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

    await axios
      .get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: searchVal,
          type: 'artist',
        },
      })
      .then((res) => {
        setError('')
        setArtists(res.data.artists.items)
      })
      .catch((err) => {
        setError('Error: Enter an artist')
      })
  }

  const setFormChange = (inputValue) => {
    setSearchVal(inputValue)
  }

  const getRecentlyPlayedList = async () => {
    await axios
      .get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setError('')
        setRecentlyPlayed(res.data.items.splice(10))
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  const getTopMonthlyList = async () => {
    await axios
      .get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setError('')
        setTopMonthlyList(res.data.items)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  useEffect(() => {
    setAccessToken(code)
    localStorage.setItem('access_token', accessToken)

    let codeVerifier

    codeVerifier = localStorage.getItem('verifier')
    // console.log('verifier=', codeVerifier)

    setVerifier(codeVerifier)

    getUser()
    getRecentlyPlayedList()
    getTopMonthlyList()
  }, [accessToken])

  return (
    <YStack f={1} p="$4" space>
      <XStack jc="space-between">
        <H1 {...home}>Stream Stats</H1>
        <XStack>
          {user ? (
            <XStack space>
              <Button {...home} icon={Home}></Button>
              <Button {...linkProps}>Go to User</Button>
              <Button onPress={() => logout()} {...loginProps}>
                Logout
              </Button>
            </XStack>
          ) : (
            <Button {...loginProps}>Login</Button>
          )}
        </XStack>
      </XStack>

      <XStack jc="center" ai="center" space>
        <UserIdHeader code={code} user={user} />
      </XStack>

      <Overview recentlyPlayed={recentlyPlayed} topMonthlyList={topMonthlyList} />
      <YStack>
        <XStack jc="center" space>
          <Label htmlFor="">Search:</Label>
          <Select defaultValue="artist">
            <Select.Trigger maxWidth="30%" iconAfter={ChevronDown}>
              <Select.Value placeholder="search..." />
            </Select.Trigger>
            <Select.Content zIndex={200}>
              <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$2"
              >
                <YStack zIndex={10}>
                  <ChevronUp backgroundColor="white" />
                </YStack>
              </Select.ScrollUpButton>
              <Select.Viewport>
                <Select.Group>
                  <Select.Item>
                    <Select.ItemText>artist</Select.ItemText>
                  </Select.Item>
                  <Select.Item>
                    <Select.ItemText>song</Select.ItemText>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
          <Form>
            {error ? <Text>{error}</Text> : null}
            <XStack alignItems="center" space="$3">
              <Input
                width={500}
                size="$4"
                value={searchVal}
                onChange={(e) => setFormChange(e.target.value)}
              />
              <Button size="$4" onPress={searchArtist}>
                Go
              </Button>
            </XStack>
          </Form>
        </XStack>
      </YStack>
      <Search artists={artists} />

      {/* <SheetDemo /> */}
    </YStack>
  )
}
