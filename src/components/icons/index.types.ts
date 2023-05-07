import type { SVGProps } from 'react';

export type WebSvgProps = SVGProps<SVGElement> & {
  size?: string | number;
};
