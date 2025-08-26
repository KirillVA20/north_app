import React from 'react';
import styles from './text.module.css';

interface TextProps {
  size?: number; // Size is now a number for direct font-size conversion
  color?: 'primary' | 'secondary' | 'tertiary';
  weight?: 'light' | 'normal' | 'bold';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  size = 16,
  color = 'primary',
  weight = 'normal',
  children,
}: TextProps) => {
  const style = {
    fontSize: `${size}px`,
  };

  const className = `${styles.text} ${styles[color]} ${styles[weight]}`;

  return (
    <p className={className} style={style}>
      {children}
    </p>
  );
};

export default Text;
