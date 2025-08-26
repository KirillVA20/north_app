import React from 'react';
import clsx from 'clsx';
import styles from './input.module.scss';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  isError?: boolean;
  message?: string;
}

export const Input: React.FC<InputProps> = ({
  isLoading = false,
  isError = false,
  message,
  className,
  disabled,
  ...rest
}) => {
  const inputClasses = clsx(
    styles.input,
    isError && styles.error,
    isLoading && styles.loading,
    className
  );

  return (
    <div className={styles.container}>
      <input
        className={inputClasses}
        disabled={disabled || isLoading}
        {...rest}
      />
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );
};
