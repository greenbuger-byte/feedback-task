import axios from "axios";

import { getApiHttpBaseUrl } from "../utils/url";

const http = axios.create({
  baseUrl: getApiHttpBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
