import React from 'react';
import styles from './title.module.css';

type TitleProps = {
  size: 1 | 2 | 3 | 4 | 5 | 6; // Changed to number for direct mapping
  children: React.ReactNode;
  className?: string;
};

const Title: React.FC<TitleProps> = ({ size, children, className }) => {
  const Component = size;
  return (
    <Component className={`${styles[`h${size}`]} ${className || ''}`.trim()}>{children}</Component>
  );
};

export default Title;
