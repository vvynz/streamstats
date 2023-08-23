import { Avatar, H3, Paragraph, Separator, XStack, YStack } from '@my/ui'

export function Overview() {
  return (
    <>
      <H3>Overview</H3>
      <Separator />
      <XStack>
        <YStack>
          <Avatar size="$10">
            <Avatar.Fallback bc="#f6f986" />
          </Avatar>
          <Paragraph>Seven (ft. Latto)</Paragraph>
        </YStack>
      </XStack>
    </>
  )
}
