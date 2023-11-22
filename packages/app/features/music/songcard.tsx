import { Avatar, Paragraph, YStack } from '@my/ui'

export function SongCard({ song }) {
  const track = song
  // console.log(song)

  return (
    <YStack
      flexWrap="wrap"
      alignItems="center"
      // borderColor="white"
      // borderWidth={1}
      space
    >
      <Avatar size="$10">
        {song.album?.images?.map((img) => {
          return <Avatar.Image key={img.id} src={img.url} />
        })}
        <Avatar.Fallback bc="#f6f986" />
      </Avatar>
      <YStack maxWidth={200}>
        <Paragraph textAlign="center" size="$2" fontWeight="700">
          {song.name}
        </Paragraph>
      </YStack>
    </YStack>
  )
}
