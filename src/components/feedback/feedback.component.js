import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useDispatch } from "react-redux";

import { Button, Input } from "../UI";
import { createNewUserRequest } from "../../store/users";

import styles from "./feedback.module.scss";

const Feedback = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const validateFeedForm = (phone, captcha) => {
    let dataIsValidate = true;
    if (phone.length < 10) {
      setError("phone", { type: "minLength" });
      dataIsValidate = false;
    }
    if (!validateCaptcha(captcha)) {
      setError("captcha", {
        type: "validate",
        message: "Капча указана неверно",
      });
      dataIsValidate = false;
    }
    return dataIsValidate;
  };

  const submitForm = (data) => {
    const phoneForValidation = data.phone.replace(/[+() _']/gi, "").slice(1);
    const { name, phone, captcha } = data;
    if (validateFeedForm(phoneForValidation, captcha)) {
      Object.keys(data).forEach((key) => setValue(key, ""));
      dispatch(createNewUserRequest({ name, phone }));
    }
  };

  const errorsAnswersForFeedbackForm = {
    name: errors.name?.type === "required" && "Поле имя не заполнено",
    phone:
      (errors.phone?.type === "required" && "Номер не указан") ||
      (errors.phone?.type === "minLength" && "Некоррекстный номер"),
    captcha:
      (errors.captcha?.type === "required" && "Капча не заполнена") ||
      (errors.captcha?.type === "validate" && "Неверная капча"),
  };

  return (
    <form className={styles.feedback} onSubmit={handleSubmit(submitForm)}>
      <h3 className={styles.feedback__title}>Форма обратной связи</h3>
      <Input
        type="text"
        label="Ваше имя"
        placeholder="Укажите свое имя"
        {...register("name", { required: true })}
        error={errorsAnswersForFeedbackForm["name"]}
      />
      <Input
        type="phone"
        label="Контактный телефон"
        placeholder="Номер телефона"
        error={errorsAnswersForFeedbackForm["phone"]}
        withPhoneMask
        {...register("phone", { required: true })}
      />
      <div className={styles.feedback__captcha}>
        <LoadCanvasTemplate reloadText="Обновить" />
        <Input
          id="user_captcha_input"
          placeholder="Введите код с картинки"
          {...register("captcha", { required: true })}
          error={
            (errors.captcha?.type === "required" && "Капча не заполнена") ||
            (errors.captcha?.type === "validate" && "Неверная капча")
          }
        />
      </div>
      <div className={styles.feedback__button}>
        <Button type="submit" label="Добавить" />
      </div>
    </form>
  );
};

export default Feedback;
