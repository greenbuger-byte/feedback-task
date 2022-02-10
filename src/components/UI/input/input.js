import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import InputMask from "react-input-mask";

import styles from "./input.module.scss";

const Input = forwardRef((props, ref) => {
  const { error, label, withPhoneMask, placeholder, ...remainingProps } = props;

  const renderError = error && (
    <div className={styles.input__message}>{error}</div>
  );

  const renderLabel = label && (
    <label className={styles.input__label}>{label}</label>
  );

  const renderInput = (
    <input
      ref={ref}
      className={clsx(styles.input, { [styles.input_error]: !!error })}
      placeholder={placeholder}
      {...remainingProps}
    />
  );

  const renderWithPhone = (
    <InputMask
      mask="+7 (999) 999 99 99"
      ref={ref}
      className={clsx(styles.input, { [styles.input_error]: !!error })}
      placeholder={placeholder}
      {...remainingProps}
    />
  );

  return (
    <div className={styles.input__wrapper}>
      {renderLabel}
      {withPhoneMask ? renderWithPhone : renderInput}
      {renderError}
    </div>
  );
});

Input.displayName = "Input";
Input.propTypes = {
  withPhoneMask: PropTypes.bool,
  placeholder: PropTypes.string,
  // Label для input
  label: PropTypes.string,
  // Если есть ошибка, приходек текст ошибки
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default Input;
