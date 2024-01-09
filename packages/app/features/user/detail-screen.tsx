import { Avatar, Button, Paragraph, Text, XStack, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [accessToken, setAccessToken] = useState('' || localStorage.getItem('accessToken'))
  const [id] = useParam('id')
  const link = useLink({
    href: '/',
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

  const profileImg =
    'https://store.linefriends.com/cdn/shop/files/BT21BABYMLBBEANDOLLRJ_4589419378918_1200x1200_1_1_400x.jpg?v=1682362586'

  const followers = 7
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
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <YStack f={1} jc="center" ai="center" space>
      <XStack>
        <Button {...link} icon={ChevronLeft}>
          Go Home
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
