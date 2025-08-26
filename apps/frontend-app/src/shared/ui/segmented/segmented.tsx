import React, { useState, useEffect } from 'react';
import styles from './segmented.module.scss';

type Option = { value: string; label: string };

interface SegmentedProps<T> {
  options: Option[];
  defaultValue?: string;
  value?: T;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export const Segmented = <T extends any>({
  options,
  defaultValue,
  value: propValue,
  onChange,
  className = '',
  disabled = false,
}: SegmentedProps<T>) => {
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? options[0].value
  );
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  // Determine if component is controlled or uncontrolled
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : internalValue;

  // Find the active option element to position the indicator
  useEffect(() => {
    const container = document.querySelector(`.${styles.segmented}`);
    if (!container) return;

    const activeOption = container.querySelector(`.${styles.optionActive}`);
    if (!activeOption) return;

    const { offsetWidth, offsetLeft } = activeOption as HTMLElement;
    setIndicatorStyle({
      width: offsetWidth,
      left: offsetLeft - 5,
    });
  }, [value, options]);

  const handleOptionClick = (option: Option) => {
    if (disabled) return;

    if (!isControlled) {
      setInternalValue(option.value);
    }
    onChange?.(option.value);
  };

  return (
    <div
      className={`${styles.segmented} blur-background ${className} ${
        disabled ? styles.disabled : ''
      }`}
      role="tablist"
    >
      {options.map((option) => (
        <button
          key={option.toString()}
          className={`${styles.option} ${
            value === option.value ? styles.optionActive : ''
          }`}
          onClick={() => handleOptionClick(option)}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          disabled={disabled}
        >
          {option.label}
        </button>
      ))}
      <div
        className={styles.indicator}
        style={{
          width: `${indicatorStyle.width}px`,
          transform: `translateX(${indicatorStyle.left}px)`,
        }}
      />
    </div>
  );
};

export default Segmented;
