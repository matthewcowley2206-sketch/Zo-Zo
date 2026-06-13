type LogoProps = {
  size?: 'nav' | 'footer'
  className?: string
}

export function Logo({ size = 'nav', className = '' }: LogoProps) {
  const titleSize =
    size === 'nav'
      ? 'text-[1.5rem] font-bold tracking-[-0.03em] sm:text-[1.75rem]'
      : 'text-[1.125rem] font-semibold tracking-[-0.02em]'

  const subtitleSize =
    size === 'nav'
      ? 'text-[0.5625rem] sm:text-[0.625rem]'
      : 'text-[0.5rem] sm:text-[0.5625rem]'

  const subtitleTone = size === 'nav' ? 'text-cream/75' : 'text-muted'

  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className={titleSize}>Zo&Zo</span>
      <span
        className={`mt-1 flex w-full justify-between font-normal uppercase leading-none ${subtitleSize} ${subtitleTone}`}
        aria-hidden
      >
        {'ADVISORY'.split('').map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </span>
    </span>
  )
}
