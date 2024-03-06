import { Paragraph, XStack } from '@my/ui'

export function Footer() {
  return (
    <XStack margin={50} jc="center" space>
      <Paragraph size="$3">© 2023 Stream Stats</Paragraph>
      <Paragraph size="$3">Contact</Paragraph>
    </XStack>
  )
}
