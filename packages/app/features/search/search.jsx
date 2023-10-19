import { H3, YStack, XStack } from '@my/ui'

import { SongCard } from '../music/songcard'

export function Search({ artists }) {
  return (
    <XStack>
      <H3>Search</H3>
      <YStack>
        {artists.map((artist) => (
          <SongCard key={artist.id} song={artist} />
        ))}
      </YStack>
    </XStack>
  )
}
