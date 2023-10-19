import { H3, YStack, XStack } from '@my/ui'

import { ArtistCard } from '../music/artistcard'

export function Search({ artists }) {
  return (
    <XStack>
      <H3>Search</H3>
      <YStack>
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </YStack>
    </XStack>
  )
}
