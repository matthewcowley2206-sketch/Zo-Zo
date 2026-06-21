import { TbyiBadge } from './TbyiBadge'
import { tbyiCapabilityTitleClasses } from '../../lib/testBeforeYouInvest'

type TbyiCapabilityHeaderProps = {
  title: string
  titleClassName?: string
  badgeClassName?: string
  className?: string
}

export function TbyiCapabilityHeader({
  title,
  titleClassName = tbyiCapabilityTitleClasses,
  badgeClassName = 'mt-1.5',
  className = '',
}: TbyiCapabilityHeaderProps) {
  return (
    <div className={className}>
      <span className={`block ${titleClassName}`}>{title}</span>
      <TbyiBadge tone="onDark" className={badgeClassName} />
    </div>
  )
}
