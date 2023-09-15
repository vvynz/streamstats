import { Avatar, H3, H4, Paragraph, Separator, XStack, YStack } from '@my/ui'

import { SongCard } from '../music/songcard'

const playlist = [
  {
    image: '',
    name: 'Seven (ft. Latto)',
  },
  {
    image: '',
    name: 'People',
  },
  {
    image: '',
    name: 'Take Two',
  },
  {
    image: '',
    name: 'More',
  },
]

const monthlyPlaylist = [
  {
    image: '',
    name: 'Seven (ft. Latto)',
  },
  {
    image: '',
    name: 'For Us',
  },
  {
    image: '',
    name: 'Slow Dancing',
  },
]
export function Overview() {
  return (
    <>
      <H3>Overview</H3>
      <Separator />
      <XStack jc="center" ai="center" space>
        {playlist.map((song) => (
          <SongCard song={song} />
        ))}
      </XStack>

      <YStack display="flex" flexDirection="column" jc="space-evenly">
        <XStack jc="center" ai="center" space>
          <H4>Your Top Song This Week</H4>
          <SongCard song="For Us" />
        </XStack>
        <YStack ai="center" space>
          <H4>Your Top Songs This Month</H4>
          {monthlyPlaylist.map((song) => (
            <SongCard song={song} />
          ))}
        </YStack>
      </YStack>
    </>
  )
}
