import { Avatar, H3, Paragraph, Separator, XStack, YStack } from '@my/ui'

const playlist = [
  {
    image: '',
    songName: 'Seven (ft. Latto)',
  },
  {
    image: '',
    songName: 'People',
  },
  {
    image: '',
    songName: 'Take Two',
  },
  {
    image: '',
    songName: 'More',
  },
]
export function Overview() {
  return (
    <>
      <H3>Overview</H3>
      <Separator />
      <XStack jc="center" ai="center" space>
        {playlist.map((song) => (
          <>
            <Avatar size="$10">
              <Avatar.Fallback bc="#f6f986" />
            </Avatar>
            <Paragraph>{song.songName}</Paragraph>
          </>
        ))}
      </XStack>
    </>
  )
}
