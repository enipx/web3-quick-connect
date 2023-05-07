import React from 'react';

import type { WebSvgProps } from './index.types';

export const CloseIcon = (props: WebSvgProps) => {
  const iconSize = props.size || 24;

  return (
    <svg width={iconSize} height={iconSize} fill="none" viewBox="0 0 24 24">
      <path
        d="m7.145 7.012 9.706 9.706M16.95 6.913l-9.9 9.9"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
