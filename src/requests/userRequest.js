import { ROUTES } from "../utils/routes";

import http from "./requests";

export const userRequest = {
  createNewUser: (data) =>
    http.post(ROUTES.users, data).then(({ data }) => data),
  loadAllUsers: () => http.get(ROUTES.users).then(({ data }) => data),
  deleteUser: (id) =>
    http.delete(`${ROUTES.users}/${id}`).then(({ data }) => data),
};
