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
export function Overview({ recentlyPlayed, topMonthlyList }) {
  // console.log(recentlyPlayed.map((track) => console.log(track.track)))
  console.log(recentlyPlayed)
  return (
    <>
      <H3>Overview</H3>
      <Separator />
      <XStack jc="center" alignContent="baseline" flex={2} flexWrap="wrap" space>
        {/* <YStack ai="center"> */}
        {recentlyPlayed.slice(0, 6).map((track) => (
          <SongCard key={track.track.id} song={track.track} />
        ))}
        {/* </YStack> */}
        {/* <YStack ai="center"> */}
        {recentlyPlayed.slice(6, 11).map((track) => (
          <SongCard key={track.track.id} song={track.track} />
        ))}
        {/* </YStack> */}
      </XStack>

      <YStack display="flex" flexDirection="column" jc="space-evenly">
        <XStack jc="center" ai="center" space>
          <H4>Your Top Song This Week</H4>
          <SongCard song="For Us" />
        </XStack>
        <YStack ai="center" space>
          <H4>Your Top Songs This Month</H4>
          <XStack jc="center" alignContent="baseline" flex={2} space>
            {topMonthlyList.slice(0, 5).map((track) => (
              <SongCard key={track.id} song={track} />
            ))}
          </XStack>
        </YStack>
      </YStack>
    </>
  )
}
