import React from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  viewType?: 'primary' | 'secondary' | 'outline' | 'blur';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  viewType = 'primary',
  isLoading = false,
  children,
  className,
  disabled,
  ...rest
}) => {
  const buttonClasses = clsx(
    className,
    styles.button,
    styles[size],
    styles[viewType],
    isLoading && styles.loading
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
