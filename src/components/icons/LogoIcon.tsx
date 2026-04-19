import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 32"
      aria-hidden="true"
      role="img"
      {...props}
    >
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="24"
        fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="-0.5"
        fill="url(#logo-gradient)"
      >
        flowtime
      </text>
    </svg>
  );
}
