import { Avatar, H3, H4, Paragraph, Separator, XStack, YStack } from '@my/ui'

import { SongCard } from '../music/songcard'

const playlist = [
  {
    id: 1,
    image: '',
    name: 'Seven (ft. Latto)',
  },
  { id: 2, image: '', name: 'People' },
  {
    id: 3,
    image: '',
    name: 'Take Two',
  },
  {
    id: 4,
    image: '',
    name: 'More',
  },
]

const monthlyPlaylist = [
  {
    id: 1,
    image: '',
    name: 'Seven (ft. Latto)',
  },
  {
    id: 2,
    image: '',
    name: 'For Us',
  },
  {
    id: 3,
    image: '',
    name: 'Slow Dancing',
  },
]
export function Overview({ recentlyPlayed }) {
  // console.log(recentlyPlayed.map((track) => console.log(track.track)))
  return (
    <>
      <H3>Overview</H3>
      <Separator />
      <XStack jc="center" ai="center" flex={2} flexWrap="wrap" space>
        <YStack ai="center">
          {recentlyPlayed.slice(0, 2).map((track) => (
            <SongCard key={track.track.id} song={track.track.album} />
          ))}
        </YStack>
        {/* <YStack ai="center">
          {recentlyPlayed.slice(3, 5).map((track) => (
            <SongCard key={track.track.id} song={track.track.album} />
          ))}
        </YStack> */}
      </XStack>

      <YStack display="flex" flexDirection="column" jc="space-evenly">
        <XStack jc="center" ai="center" space>
          <H4>Your Top Song This Week</H4>
          <SongCard song="For Us" />
        </XStack>
        <YStack ai="center" space>
          <H4>Your Top Songs This Month</H4>
          {/* {monthlyPlaylist.map((song) => (
            <SongCard key={song.id} song={song} />
          ))} */}
        </YStack>
      </YStack>
    </>
  )
}
