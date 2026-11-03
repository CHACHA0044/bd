import type { ComponentType, CSSProperties, MouseEvent, ReactNode } from 'react';

export interface FlyingButtonProps {
  children?: ReactNode;
  theme?: 'dark' | 'light';
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';
  trigger?: 'hover' | 'click';
  carryCursor?: boolean;
  altitude?: number;
  hoverTime?: number;
  jets?: number;
  thrusters?: boolean;
  smoke?: number;
  turbulence?: number;
  wobble?: number;
  buttonColor?: string;
  textColor?: string;
  thrustColor?: string;
  smokeColor?: string;
  ramp?: boolean;
  radius?: number | string;
  className?: string;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

declare const FlyingButton: ComponentType<FlyingButtonProps>;

export default FlyingButton;
