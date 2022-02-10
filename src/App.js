import React from "react";
import { Provider } from "react-redux";

import Feedback from "./components/feedback";
import httpFakeServer from "./server/httpFakeServer";
import store from "./store/store";
import UserList from "./components/user-list";

httpFakeServer();
const App = () => (
  <Provider store={store}>
    <div className="App">
      <Feedback />
      <UserList />
    </div>
  </Provider>
);

export default App;
