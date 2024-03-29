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
import React, { useState, useEffect } from 'react'
import { useLink } from 'solito/link'

// Components
import { UserIdHeader } from '../user/id-header'
import { Overview } from '../overview/overview'
import { Main } from '../user/main'
import { LoginPage } from '../login/login'
import { Link } from '../link/link'

import axios from 'axios'

export function HomeScreen() {
  // const [user, setUser] = useState('')
  const [code, setCode] = useState('')

  const clientID = '2b521e63e3ff470fadd0ad967629e3cf'
  const redirectURL = 'http://localhost:3000'

  const linkProps = useLink({
    href: '/user/RJ',
  })

  const loginProps = useLink({
    href: '/login',
  })

  console.log('code?', code)

  useEffect(() => {
    let codeID

    codeID = localStorage.getItem('access_token')
    // new URLSearchParams(window.location.search).get('access_token')
    // window.localStorage.setItem('accessToken', codeID)
    setCode(codeID)
  }, [])

  return code ? (
    <Main code={code} clientID={clientID} redirectURL={redirectURL} />
  ) : (
    <LoginPage code={code} setCode={setCode} redirectURL={redirectURL} />
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
