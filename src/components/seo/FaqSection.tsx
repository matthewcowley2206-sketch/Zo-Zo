import { FadeIn } from '../ui/FadeIn'
import type { FaqItem } from '../../content/seo'

type FaqSectionProps = {
  eyebrow?: string
  title: string
  items: FaqItem[]
  theme?: 'light' | 'dark'
}

export function FaqSection({
  eyebrow = 'Common questions',
  title,
  items,
  theme = 'light',
}: FaqSectionProps) {
  const isDark = theme === 'dark'

  return (
    <section aria-labelledby="faq-heading">
      <p className={`eyebrow mb-4 ${isDark ? 'text-cream/50' : ''}`}>{eyebrow}</p>
      <h2
        id="faq-heading"
        className={isDark ? 'headline-section text-cream' : 'headline-section'}
      >
        {title}
      </h2>
      <div className={`mt-10 space-y-8 ${isDark ? '' : 'content-max mx-auto max-w-[720px]'}`}>
        {items.map((item, index) => (
          <FadeIn key={item.question} delay={index * 0.05}>
            <article
              className={`border-b pb-8 ${
                isDark ? 'border-cream/10' : 'border-line'
              }`}
            >
              <h3
                className={`text-[1.125rem] font-semibold ${
                  isDark ? 'text-cream' : 'text-ink'
                }`}
              >
                {item.question}
              </h3>
              <p
                className={`mt-3 text-[1.0625rem] leading-relaxed ${
                  isDark ? 'text-cream/65' : 'text-muted'
                }`}
              >
                {item.answer}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
