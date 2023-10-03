import React from 'react'
import { Avatar, Text, YStack } from '@my/ui'

export function UserIdHeader() {
  return (
    <YStack jc="center" ai="center" space="$3">
      <Avatar circular size="$10">
        <Avatar.Image src="https://store.linefriends.com/cdn/shop/files/BT21BABYMLBBEANDOLLRJ_4589419378918_1200x1200_1_1_400x.jpg?v=1682362586" />
        <Avatar.Fallback bc="#f6f986" />
      </Avatar>
      <Text>This is the user id header</Text>
    </YStack>
  )
}
