import { useEffect } from 'react'
import type { PageSeo } from '../../content/seo'
import {
  buildJsonLd,
  getOpenGraphPayload,
  upsertJsonLd,
  upsertLink,
  upsertMeta,
} from '../../lib/seoMeta'

type PageMetaProps = {
  seo: PageSeo
}

export function PageMeta({ seo }: PageMetaProps) {
  useEffect(() => {
    document.title = seo.title

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('name', 'author', 'Zo&Zo Advisory')

    const og = getOpenGraphPayload(seo)
    upsertMeta('property', 'og:title', og.title)
    upsertMeta('property', 'og:description', og.description)
    upsertMeta('property', 'og:url', og.url)
    upsertMeta('property', 'og:image', og.image)
    upsertMeta('property', 'og:type', og.type)
    upsertMeta('property', 'og:site_name', og.siteName)
    upsertMeta('property', 'og:locale', og.locale)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', og.title)
    upsertMeta('name', 'twitter:description', og.description)
    upsertMeta('name', 'twitter:image', og.image)

    upsertLink('canonical', og.url)
    upsertJsonLd('zoandzo-json-ld', buildJsonLd(seo))
  }, [seo])

  return null
}
