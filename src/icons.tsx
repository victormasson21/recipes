import type { ReactNode } from "react"

type IconProps = { readonly size?: number; readonly strokeWidth?: number; readonly children: ReactNode }

const Icon = ({ size = 24, strokeWidth = 2, children }: IconProps) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
)

export const ChevronRight = () => (
  <Icon>
    <path d="M9 6l6 6-6 6" />
  </Icon>
)

export const ArrowLeft = () => (
  <Icon>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Icon>
)

export const MagnifyingGlass = () => (
  <Icon>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Icon>
)

export const Cross = () => (
  <Icon size={16} strokeWidth={2.5}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
)

export const External = () => (
  <Icon size={18}>
    <path d="M14 5h5v5M19 5l-8 8M11 7H6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5" />
  </Icon>
)

export const Copy = () => (
  <Icon size={20}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </Icon>
)

export const Tick = () => (
  <Icon size={16} strokeWidth={2.5}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
)

export const Timer = () => (
  <Icon size={28}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2M9.5 2.5h5" />
  </Icon>
)
