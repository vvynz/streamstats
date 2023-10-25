import { Avatar, Paragraph, YStack } from '@my/ui'

export function SongCard({ song }) {
  const track = song

  return (
    <YStack space>
      <Avatar size="$10">
        {/* {track.images.map((img) => (
          <Avatar.Image key={img.id} src={img.url} />
        ))} */}
        <Avatar.Fallback bc="#f6f986" />
      </Avatar>
      <Paragraph>{song.name}</Paragraph>
    </YStack>
  )
}
