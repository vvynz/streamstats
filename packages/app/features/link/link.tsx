import { Button } from '@my/ui'
import { useLink } from 'solito/link'

export function Link({ href, text }) {
  const linkProps = useLink({
    href: { href },
  })

  return <Button {...linkProps}>{text}</Button>
}
