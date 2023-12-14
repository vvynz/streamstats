import { Avatar, Button, Paragraph, XStack, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
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

  const profileImg =
    'https://store.linefriends.com/cdn/shop/files/BT21BABYMLBBEANDOLLRJ_4589419378918_1200x1200_1_1_400x.jpg?v=1682362586'

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
    </YStack>
  )
}
