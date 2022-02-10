export const getApiHttpBaseUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return `${window.location.protocol}//${window.location.host}:${window.location.port}/api/`;
  } else {
    //TODO: production url now throw error
    throw new Error("Для работы с ПРОДАКШН сборкой установите адрес сервера");
  }
};
