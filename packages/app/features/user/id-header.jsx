import React from 'react'
import { Avatar, H2, YStack } from '@my/ui'

export function UserIdHeader({ user }) {
  const profileImg =
    'https://store.linefriends.com/cdn/shop/files/BT21BABYMLBBEANDOLLRJ_4589419378918_1200x1200_1_1_400x.jpg?v=1682362586'

  return (
    <YStack jc="center" ai="center" space="$3">
      <Avatar circular size="$10">
        {user.image ? <Avatar.Image src={user.image[0]} /> : <Avatar.Image src={profileImg} />}
        {/* <Avatar.Fallback bc="#f6f986" /> */}
      </Avatar>
      <H2>Welcome {user.id}!</H2>
    </YStack>
  )
}
