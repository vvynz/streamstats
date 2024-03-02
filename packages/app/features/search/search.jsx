import { H3, Separator, YStack, XStack } from '@my/ui'

import { ArtistCard } from '../music/artistcard'

export function Search({ artists }) {
  return (
    <YStack space>
      <H3>Search</H3>
      <Separator />
      <XStack display="flex" justifyContent="center" alignItems="center" space>
        {artists.slice(0, 9).map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </XStack>
    </YStack>
  )
}
