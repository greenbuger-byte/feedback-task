export const getApiHttpBaseUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return `${window.location.protocol}//${window.location.host}:${window.location.port}/api/`;
  } else {
    return "https://feedback-task.vercel.app/";
  }
};
