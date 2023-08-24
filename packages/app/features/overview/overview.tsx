import { Avatar, H3, Paragraph, Separator, XStack, YStack } from '@my/ui'

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
    </>
  )
}
