import { createServer, Model } from "miragejs";
import * as uuid from "uuid";

const getUsers = {
  users: [
    {
      id: "3",
      name: "Tester",
      phone: "+7 (919) 909 99 99",
    },
  ],
};

function httpFakeServer() {
  return createServer({
    models: {
      users: Model,
    },
    seeds(server) {
      getUsers.users.forEach((user) => server.create("user", user));
    },
    routes() {
      this.name = "api";
      this.get("/users", (scheme) => {
        return scheme.users.all();
      });
      this.post("/users", (scheme, request) => {
        const { name, phone } = JSON.parse(request.requestBody);
        const idOfNewUser = uuid.v1();
        scheme.users.create({ id: idOfNewUser, name, phone });
        return { id: idOfNewUser, name, phone };
      });
      this.delete("/users/:id", (scheme, request) => {
        const { id } = request.params;
        scheme.users.find(id).destroy();
        return { id };
      });
    },
  });
}

export default httpFakeServer;
