import React from "react";
import clsx from "clsx";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  isDisabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  isDisabled = false,
  className,
  checked,
  onChange,
  ...rest
}) => {
  const checkboxClasses = clsx(
    styles.checkbox,
    isDisabled && styles.disabled,
    className
  );

  return (
    <label className={checkboxClasses}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={isDisabled}
        className={styles.hiddenInput}
        {...rest}
      />
      <span className={styles.customCheckbox} />
    </label>
  );
};
