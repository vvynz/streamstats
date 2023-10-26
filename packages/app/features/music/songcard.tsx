import { Avatar, Paragraph, YStack } from '@my/ui'

export function SongCard({ song }) {
  const track = song
  // console.log(song.images[0].url)

  return (
    <YStack space>
      <Avatar size="$10">
        {song.images?.map((img) => {
          return <Avatar.Image key={img.id} src={img.url} />
        })}
        {/* <Avatar.Image key={song.images[0]} src={song.images[0].url} /> */}
        <Avatar.Fallback bc="#f6f986" />
      </Avatar>
      <Paragraph>{song.name}</Paragraph>
    </YStack>
  )
}
