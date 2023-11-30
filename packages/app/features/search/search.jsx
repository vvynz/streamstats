import { H3, Separator, YStack, XStack } from '@my/ui'

import { ArtistCard } from '../music/artistcard'

export function Search({ artists }) {
  return (
    <YStack space>
      <H3>Search</H3>
      <Separator />
      <YStack display="flex" jc alignContent="center" space>
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </YStack>
    </YStack>
  )
}
