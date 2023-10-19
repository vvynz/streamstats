import { Avatar, Paragraph, XStack } from '@my/ui'

export function ArtistCard({ artist }) {
  return (
    <XStack space>
      <Avatar circular size="$8">
        {artist.images.map((a) => (
          <Avatar.Image key={a.id} src={a.url} />
        ))}
        <Avatar.Fallback bc="" />
      </Avatar>
      <Paragraph>{artist.name}</Paragraph>
    </XStack>
  )
}
