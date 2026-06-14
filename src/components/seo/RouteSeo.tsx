import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { resolvePageSeo } from '../../content/seo'
import { PageMeta } from './PageMeta'

export function RouteSeo() {
  const { pathname } = useLocation()
  const { slug } = useParams<{ slug?: string }>()

  const seo = useMemo(() => resolvePageSeo(pathname, slug), [pathname, slug])

  return <PageMeta seo={seo} />
}
