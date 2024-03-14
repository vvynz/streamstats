import { Avatar, Paragraph, XStack, YStack } from '@my/ui'

export function ArtistCard({ artist }) {
  return (
    <YStack ai="center" gap="$5">
      <Avatar circular size="$8">
        {artist.images.map((img) => (
          <Avatar.Image key={img.id} src={img.url} />
        ))}
        <Avatar.Fallback bc="" />
      </Avatar>
      <Paragraph>{artist.name}</Paragraph>
    </YStack>
  )
}
