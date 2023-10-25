import { Avatar, Paragraph, XStack } from '@my/ui'

export function ArtistCard({ artist }) {
  return (
    <XStack space>
      <Avatar circular size="$8">
        {artist.images.map((img) => (
          <Avatar.Image key={img.id} src={img.url} />
        ))}
        <Avatar.Fallback bc="" />
      </Avatar>
      <Paragraph>{artist.name}</Paragraph>
    </XStack>
  )
}
