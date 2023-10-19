import { Avatar, Paragraph, YStack } from '@my/ui'

export function ArtistCard({ artist }) {
  return (
    <YStack>
      <Avatar size="$7">
        <Avatar.Image src={artist.images.url} />
        <Avatar.Fallback bc="" />
      </Avatar>
      <Paragraph>{artist.name}</Paragraph>
    </YStack>
  )
}
