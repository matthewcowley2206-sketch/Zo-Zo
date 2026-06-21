import { Link } from 'react-router-dom'
import type { methodSteps } from '../../content/method'
import {
  tbyiCapabilityBodyClasses,
  tbyiCapabilityCtaClasses,
  tbyiCapabilityLinkClasses,
  tbyiCapabilityTitleClasses,
} from '../../lib/testBeforeYouInvest'
import { TbyiCapabilityHeader } from '../services/TbyiCapabilityHeader'

type MethodStep = (typeof methodSteps)[number]

type MethodStepCardProps = {
  step: MethodStep
  titleAs?: 'h2' | 'h3'
  bodyClassName?: string
}

export function MethodStepCard({
  step,
  titleAs = 'h3',
  bodyClassName = 'text-cream/65',
}: MethodStepCardProps) {
  const isPrototype = step.id === 'prototype'
  const TitleTag = titleAs

  return (
    <Link
      to={step.href}
      className={`group flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/30 focus-visible:ring-offset-2 focus-visible:ring-offset-nav sm:p-9 ${
        isPrototype
          ? `${tbyiCapabilityLinkClasses} shadow-md shadow-zo-green-deep/25 focus-visible:ring-emerald-400/40`
          : 'border-cream/10 bg-cream/[0.04] hover:border-cream/20 hover:bg-cream/[0.08]'
      }`}
    >
      <span
        className={`text-[0.8125rem] font-medium tabular-nums ${
          isPrototype ? 'text-cream/55' : 'text-cream/45'
        }`}
      >
        {step.number}
      </span>
      {isPrototype ? (
        <TbyiCapabilityHeader
          title={step.title}
          titleClassName={`headline-small ${tbyiCapabilityTitleClasses}`}
          badgeClassName="mt-2"
          className="mt-3"
        />
      ) : (
        <TitleTag className="headline-small mt-3 text-cream">{step.title}</TitleTag>
      )}
      <p
        className={`mt-4 flex-1 text-[1.0625rem] leading-relaxed ${
          isPrototype ? tbyiCapabilityBodyClasses : bodyClassName
        }`}
      >
        {step.description}
      </p>
      <p
        className={`mt-5 text-[0.8125rem] leading-relaxed ${
          isPrototype ? 'text-cream/55' : 'text-cream/45'
        }`}
      >
        {step.uncertainty}
      </p>
      <span
        className={`mt-6 text-[0.875rem] transition-opacity ${
          isPrototype
            ? `${tbyiCapabilityCtaClasses} opacity-80 group-hover:opacity-100`
            : 'font-medium text-cream/50 group-hover:text-cream/80'
        }`}
      >
        Explore →
      </span>
    </Link>
  )
}
