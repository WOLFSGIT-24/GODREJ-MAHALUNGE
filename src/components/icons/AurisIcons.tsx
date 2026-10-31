// Runwal Auris line-icon set.
// 48px grid, 1.25 stroke, round caps. Secondary strokes use --icon-accent
// so each icon can be rendered two-tone (navy + gold) from the parent class.
import React from 'react';

type IconProps = { className?: string };

const Svg = ({ className, children }: IconProps & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.25}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

const Accent = ({ children }: { children: React.ReactNode }) => (
  <g stroke="var(--icon-accent, currentColor)">{children}</g>
);

// Smooth water line built from mirrored quadratic curves.
const wave = (x: number, y: number, crests: number, w = 6, a = 1.6) =>
  `M${x} ${y} q${w / 4} ${-a} ${w / 2} 0` + ` t${w / 2} 0`.repeat(crests * 2 - 1);

// ---------------------------------------------------------------------------
// Amenities
// ---------------------------------------------------------------------------
export const SunrisePavilionIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M6 40h36" />
    <path d="M10 24 24 16l14 8" />
    <path d="M9 24h30" />
    <path d="M14 24v16M34 24v16M24 28v12" />
    <Accent>
      <path d="M19 11a5 5 0 0 1 10 0" />
      <path d="M24 3v2.5M16.6 5.8l1.6 1.6M31.4 5.8l-1.6 1.6M13 11h2.5M32.5 11H35" />
    </Accent>
  </Svg>
);

export const InfinityPoolIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M4 21h40" />
    <path d="M7 21v14h34V21" />
    <path d="M13 21v-6M18 21v-6M13 17.5h5" />
    <Accent>
      <path d={wave(10, 28, 4, 7)} />
      <path d="M33 14a4 4 0 0 0-8 0" />
    </Accent>
  </Svg>
);

export const YogaIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="24" cy="8.5" r="2.5" />
    <path d="M24 12v13" />
    <path d="M24 15.5 18 9.5M24 15.5l6-6" />
    <path d="M24 25v13" />
    <path d="M24 25.5 18 30l6 3" />
    <Accent>
      <path d="M13 40h22" />
    </Accent>
  </Svg>
);

export const UrbanForestIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M5 38h38" />
    <circle cx="15" cy="20" r="7" />
    <path d="M15 27v11M15 31l3-3" />
    <Accent>
      <circle cx="32" cy="15" r="8.5" />
    </Accent>
    <path d="M32 23.5V38M32 29l-3.5-3.5M32 27l3-3" />
  </Svg>
);

export const LibraryIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M5 38h38" />
    <rect x="9" y="14" width="6" height="24" />
    <rect x="15" y="9" width="7" height="29" />
    <rect x="22" y="16" width="5" height="22" />
    <path d="m29 38 5.2-20.4 4.4 1.1L33.4 38" />
    <Accent>
      <path d="M15 14h7M15 33h7M9 18h6" />
    </Accent>
  </Svg>
);

export const JoggingTrackIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="5" y="13" width="38" height="22" rx="11" />
    <rect x="11" y="19" width="26" height="10" rx="5" />
    <Accent>
      <path d="M24 35v-6" />
      <path d="M19 9h9m-2.5-2.5L28 9l-2.5 2.5" />
    </Accent>
  </Svg>
);

export const TennisCourtIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="5" y="11" width="38" height="26" />
    <path d="M5 14.5h38M5 33.5h38" />
    <path d="M14 14.5v19M34 14.5v19M14 24h20" />
    <Accent>
      <path d="M24 8v32" />
    </Accent>
  </Svg>
);

export const GymIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="9" y="15" width="5" height="18" rx="1" />
    <rect x="34" y="15" width="5" height="18" rx="1" />
    <rect x="5" y="19" width="4" height="10" rx="1" />
    <rect x="39" y="19" width="4" height="10" rx="1" />
    <Accent>
      <path d="M14 24h20" />
    </Accent>
  </Svg>
);

export const BadmintonIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M20.5 33 15 10h18l-5.5 23" />
    <path d="M20.5 33h7v1.5a3.5 3.5 0 0 1-7 0z" />
    <Accent>
      <path d="M22.5 33 21 10M25.5 33 27 10M17.2 19.5h13.6" />
    </Accent>
  </Svg>
);

export const SquashIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <ellipse cx="19" cy="17" rx="8" ry="10.5" transform="rotate(-40 19 17)" />
    <path d="m25.5 24.5 6 6" />
    <path d="m31.5 30.5 6 6" strokeWidth={2.25} />
    <Accent>
      <path d="M13 12.5 23 23.5M15.5 9.5l10 11" />
      <circle cx="38" cy="11" r="2.5" />
    </Accent>
  </Svg>
);

export const PartyLawnIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M6 11c6 5 30 5 36 0" />
    <path d="M5 38h38" />
    <path d="M11 38l1-3 1 3M33 38l1-3 1 3" />
    <path d="M21 24h7l-3.5 4.5V34M22 34h5" />
    <Accent>
      <path d="m10 13.4 2 5 2.4-4M18 14.7l2 5 2.2-4.6M26 14.7l2 5 2.2-4.8M34 13.6l2 5 2-4.6" />
    </Accent>
  </Svg>
);

export const PoolDeckIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="5" y="29" width="38" height="10" rx="1" />
    <path d="M8 25h13l6-8M10 25v4M19 25v4" />
    <path d="M36 25V9" />
    <Accent>
      <path d="M28 13.5c2-5.3 14-5.3 16 0z" />
      <path d={wave(9, 34.5, 5, 6, 1.4)} />
    </Accent>
  </Svg>
);

export const HallIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M5 15 24 6l19 9" />
    <path d="M8 14v24h32V14" />
    <path d="M5 38h38" />
    <path d="M12 20h6M30 20h6" />
    <Accent>
      <path d="M19 38V27h10v11M24 27v11" />
    </Accent>
  </Svg>
);

export const GamesIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M14 17h20a7 7 0 0 1 6.8 5.3l2 8.2a4.2 4.2 0 0 1-7.2 3.8L31 30H17l-4.6 4.3a4.2 4.2 0 0 1-7.2-3.8l2-8.2A7 7 0 0 1 14 17z" />
    <path d="M14 21v6M11 24h6" />
    <Accent>
      <circle cx="32" cy="22" r="1.2" />
      <circle cx="35.5" cy="25.5" r="1.2" />
    </Accent>
  </Svg>
);

export const KidsIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="7" y="28" width="10" height="10" />
    <rect x="17" y="28" width="10" height="10" />
    <rect x="12" y="18" width="10" height="10" />
    <Accent>
      <ellipse cx="36" cy="13" rx="5" ry="6" />
      <path d="M36 19c-1.5 3 1.5 6 0 9.5s1.5 6 0 9.5" />
    </Accent>
  </Svg>
);

// ---------------------------------------------------------------------------
// Project highlights
// ---------------------------------------------------------------------------
export const EcoDeckIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M4 34h40M9 34v5M39 34v5M4 38h40" />
    <Accent>
      <path d="M24 30c-8.5 0-12.5-6-10.5-17 10.5 0 14.5 6 10.5 17z" />
      <path d="M24 30 16.5 16.5" />
    </Accent>
  </Svg>
);

export const ClubhouseIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M5 38h38" />
    <path d="M8 38V20l16-9 16 9v18" />
    <path d="M14 24h6v6h-6zM28 24h6v6h-6z" />
    <Accent>
      <path d="M21 38v-7h6v7" />
    </Accent>
  </Svg>
);

export const PoolsIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d={wave(6, 18, 3)} />
    <Accent>
      <path d={wave(6, 25, 3)} />
    </Accent>
    <path d={wave(6, 32, 3)} />
  </Svg>
);

// ---------------------------------------------------------------------------
// Residences
// ---------------------------------------------------------------------------
export const DeckIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M10 5v35M5 40h38" />
    <path d="M10 27h29M10 19h29" />
    <path d="M16 19v8M22 19v8M28 19v8M34 19v8M39 19v8" />
    <Accent>
      <circle cx="34" cy="9.5" r="3" />
    </Accent>
  </Svg>
);

export const WindowIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="9" y="6" width="30" height="34" />
    <path d="M24 6v34M9 31h30" />
    <Accent>
      <path d="m28 15 5-5M28 21l9-9M31 24l6-6" />
    </Accent>
  </Svg>
);

export const ElevationIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M5 38h38" />
    <rect x="13" y="12" width="13" height="26" />
    <path d="M13 18h13M13 24h13M13 30h13M19.5 12V8" />
    <Accent>
      <path d="M35 32V8m-4 4 4-4 4 4" />
    </Accent>
  </Svg>
);

export const LayoutIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="7" y="7" width="34" height="34" />
    <path d="M7 22h11M22 7v14M22 28h19M30 28v13M22 41V33" />
    <Accent>
      <path d="M18 22a4 4 0 0 1 4-4M22 28a5 5 0 0 0-5 5" />
    </Accent>
  </Svg>
);

export const ServiceIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M12 33a12 12 0 0 1 24 0" />
    <path d="M9 33h30M7 38h34" />
    <path d="M24 21v-3M21 18h6" />
    <Accent>
      <path d="M17 29a8 8 0 0 1 4.5-5" />
    </Accent>
  </Svg>
);

// ---------------------------------------------------------------------------
// The difference
// ---------------------------------------------------------------------------
export const LandParcelIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M6 18 24 9l18 9-18 9z" />
    <path d="M6 18v5l18 9 18-9v-5" />
    <Accent>
      <path d="m6 29 18 9 18-9" />
      <circle cx="24" cy="16" r="2.5" />
    </Accent>
  </Svg>
);

export const LowDensityIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M4 38h40" />
    <rect x="20" y="7" width="8" height="31" />
    <path d="M20 14h8M20 21h8M20 28h8" />
    <Accent>
      <circle cx="10" cy="29" r="4" />
      <path d="M10 33v5" />
      <circle cx="38" cy="29" r="4" />
      <path d="M38 33v5" />
    </Accent>
  </Svg>
);

export const FloorPlateIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="6" y="11" width="36" height="26" rx="1" />
    <path d="M18 11v26M30 11v26M6 24h12M30 24h12" />
    <Accent>
      <rect x="21" y="20" width="6" height="8" />
    </Accent>
  </Svg>
);

export const GatedIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="6" y="15" width="6" height="23" />
    <rect x="36" y="15" width="6" height="23" />
    <path d="m6 15 3-3 3 3M36 15l3-3 3 3" />
    <path d="M12 38h24M16 19v19M20 17.6V38M24 17v21M28 17.6V38M32 19v19" />
    <Accent>
      <path d="M12 21c4-5 20-5 24 0" />
    </Accent>
  </Svg>
);

export const ParkingIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M6 16 24 8l18 8-18 8z" />
    <Accent>
      <path d="m6 23 18 8 18-8M6 30l18 8 18-8" />
    </Accent>
    <path d="M21 19v-7h3.5a2.25 2.25 0 0 1 0 4.5H21" />
  </Svg>
);

// ---------------------------------------------------------------------------
// Location
// ---------------------------------------------------------------------------
export const MetroIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="13" y="6" width="22" height="28" rx="5" />
    <rect x="16" y="10" width="16" height="9" rx="1.5" />
    <circle cx="18.5" cy="27" r="1.5" />
    <circle cx="29.5" cy="27" r="1.5" />
    <path d="m17 34-4 6M31 34l4 6" />
    <Accent>
      <path d="M8 40h32M14 37h20" />
    </Accent>
  </Svg>
);

export const RailIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M5 30V16a4 4 0 0 1 4-4h26l8 9v9z" />
    <path d="M9 17h7v6H9zM20 17h7v6h-7zM31 17h5l4 6h-9z" />
    <circle cx="13" cy="33" r="2.5" />
    <circle cx="33" cy="33" r="2.5" />
    <Accent>
      <path d="M4 39h40" />
    </Accent>
  </Svg>
);

export const HighwayIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M15 41 21 7M33 41 27 7M6 7h36" />
    <Accent>
      <path d="M24 11v4M24 20v5M24 31v6" />
    </Accent>
  </Svg>
);

export const SchoolIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M5 38h38" />
    <path d="m8 20 16-9 16 9" />
    <path d="M10 19v19M38 19v19" />
    <path d="M21 38v-8h6v8M14 25h4M30 25h4" />
    <Accent>
      <path d="M24 11V4l5 2-5 2" />
    </Accent>
  </Svg>
);

export const HospitalIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M5 38h38" />
    <rect x="10" y="11" width="28" height="27" />
    <path d="M21 38v-6h6v6M14 30h3M31 30h3" />
    <Accent>
      <path d="M24 16v8M20 20h8" />
    </Accent>
  </Svg>
);

export const ShoppingIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M11 17h26l-2 22H13z" />
    <path d="M19 17v-3a5 5 0 0 1 10 0v3" />
    <Accent>
      <path d="M19 24a5 5 0 0 0 10 0" />
    </Accent>
  </Svg>
);

export const MapPinIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M24 42s13-12.5 13-23a13 13 0 0 0-26 0c0 10.5 13 23 13 23z" />
    <Accent>
      <circle cx="24" cy="19" r="4.5" />
    </Accent>
  </Svg>
);

// ---------------------------------------------------------------------------
// Interface glyphs (24px grid, same stroke language)
// ---------------------------------------------------------------------------
const UiSvg = ({ className, children }: IconProps & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.25}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

export const ArrowIcon = ({ className }: IconProps) => (
  <UiSvg className={className}>
    <path d="M3 12h17M15 7l5 5-5 5" />
  </UiSvg>
);

export const ArrowLeftIcon = ({ className }: IconProps) => (
  <UiSvg className={className}>
    <path d="M21 12H4M9 7l-5 5 5 5" />
  </UiSvg>
);

export const DownloadIcon = ({ className }: IconProps) => (
  <UiSvg className={className}>
    <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19h14" />
  </UiSvg>
);

export const PhoneIcon = ({ className }: IconProps) => (
  <UiSvg className={className}>
    <path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />
  </UiSvg>
);

export const CloseIcon = ({ className }: IconProps) => (
  <UiSvg className={className}>
    <path d="M5 5l14 14M19 5 5 19" />
  </UiSvg>
);

export const MenuIcon = ({ className }: IconProps) => (
  <UiSvg className={className}>
    <path d="M3 7h18M3 12h18M9 17h12" />
  </UiSvg>
);

export const ExpandIcon = ({ className }: IconProps) => (
  <UiSvg className={className}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </UiSvg>
);

export const ShieldIcon = ({ className }: IconProps) => (
  <UiSvg className={className}>
    <path d="M12 3 5 6v5.5c0 4.3 3 8 7 9.5 4-1.5 7-5.2 7-9.5V6z" />
    <path d="m9 12 2 2 4-4" />
  </UiSvg>
);

export const CheckIcon = ({ className }: IconProps) => (
  <UiSvg className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.5 2.7 2.5L16 9.5" />
  </UiSvg>
);

export const ExternalIcon = ({ className }: IconProps) => (
  <UiSvg className={className}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </UiSvg>
);
