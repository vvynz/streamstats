import { Avatar, Paragraph, YStack } from '@my/ui'

export function SongCard({ song }) {
  return (
    <YStack space>
      <Avatar size="$10">
        <Avatar.Fallback bc="#f6f986" />
      </Avatar>
      <Paragraph>{song.name}</Paragraph>
    </YStack>
  )
}
