import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  Text,
  useToastController,
  XStack,
  YStack,
  ZStack,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useLink } from 'solito/link'

// Components
import { UserIdHeader } from '../user/id-header'
import { Link } from '../link/link'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/RJ',
  })

  const loginProps = useLink({
    href: '/login',
  })

  return (
    <YStack f={1} p="$4" space>
      <YStack space="$4" maw={600}>
        <H1>Stream Stats</H1>
        <Button {...loginProps}>Login</Button>
      </YStack>

      <XStack jc="center" ai="center" space>
        <UserIdHeader />
      </XStack>

      <XStack>
        {/* <Button {...linkProps}>Go to User</Button> */}
        <Link href="/user/RJ" text="User" />
      </XStack>

      {/* <SheetDemo /> */}
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const toast = useToastController()

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
