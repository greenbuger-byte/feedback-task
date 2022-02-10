import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./button.module.scss";

const Button = (props) => {
  const { label, fullWidth, isCircle, ...remainingProps } = props;
  return (
    <button
      className={clsx(styles.button, {
        [styles.button_full]: fullWidth,
        [styles.button_circle]: isCircle,
      })}
      {...remainingProps}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  //Текст на кнопке
  label: PropTypes.string,
  //На всб ширину
  fullWidth: PropTypes.bool,
  // Кнопка круглая
  isCircle: PropTypes.bool,
};

export default Button;
