export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === '/services') {
    return pathname === '/services' || pathname.startsWith('/services/')
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}
