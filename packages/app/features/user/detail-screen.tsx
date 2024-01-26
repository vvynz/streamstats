import { Avatar, Button, Paragraph, Text, XStack, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'

import hooks from 'app/hooks/hooks'

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [accessToken, setAccessToken] = useState('' || localStorage.getItem('access_token'))
  const [id] = useParam('id')

  const link = useLink({
    href: '/',
  })

  const loginProps = useLink({
    href: '/login',
  })
  const [userData, setUserData] = useState([
    {
      id: '',
      images: [],
      followers: {
        total: 0,
      },
    },
  ])
  const [followers, setFollowers] = useState(0)

  const logout = hooks()

  const profileImg =
    'https://store.linefriends.com/cdn/shop/files/BT21BABYMLBBEANDOLLRJ_4589419378918_1200x1200_1_1_400x.jpg?v=1682362586'

  const following = 59

  const getProfile = async () => {
    await axios
      .get(
        `
    https://api.spotify.com/v1/users/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        setUserData(res.data)
        setFollowers(res.data.followers.total)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getFollowedList = async () => {
    await axios
      .get(`https://api.spotify.com/v1/me/following`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  console.log('token=', accessToken)

  useEffect(() => {
    getProfile()
    getFollowedList()
  }, [accessToken])

  return (
    <YStack f={1} jc="center" ai="center" space>
      <XStack space>
        <Button {...link} icon={ChevronLeft}>
          Go Home
        </Button>
        <Button onPress={() => logout(setUserData, setAccessToken)} {...loginProps}>
          Logout
        </Button>
      </XStack>
      <XStack jc="space-evenly" ai="center" space>
        <Avatar circular size="$15">
          <Avatar.Image src={profileImg} />
        </Avatar>
        <Paragraph fontSize="$10" ta="center" fow="700">{`User ID: ${id}`}</Paragraph>
      </XStack>
      <XStack alignSelf="center">
        <Text>
          {followers} follower | {following} following
        </Text>
      </XStack>
    </YStack>
  )
}
