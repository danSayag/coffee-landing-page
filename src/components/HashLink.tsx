import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToHash } from '../lib/scroll'

interface HashLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** '#id' for a section on the home page, or '/path' for a route. */
  href: string
  children: ReactNode
}

/**
 * A link that resolves correctly whether the target section lives on the
 * current page or on the home page: '#id' hrefs scroll in place on '/' and
 * navigate home-then-scroll from any other route; '/path' hrefs use the router.
 */
function HashLink({ href, onClick, ...props }: HashLinkProps) {
  const location = useLocation()
  const navigate = useNavigate()

  if (!href.startsWith('#')) {
    return <Link to={href} {...props} onClick={onClick} />
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick?.(event)
    if (location.pathname === '/') {
      scrollToHash(href)
    } else {
      navigate(`/${href}`)
    }
  }

  return <a href={`/${href}`} {...props} onClick={handleClick} />
}

export default HashLink
