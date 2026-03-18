"use client";

import { useInkTransition } from "@/components/ink-transition-provider";

interface InkTransitionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  color: string;
  glowColor: string;
}

export function InkTransitionLink({
  href,
  color,
  glowColor,
  children,
  ...props
}: InkTransitionLinkProps) {
  const { trigger } = useInkTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trigger(href, color, glowColor);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
