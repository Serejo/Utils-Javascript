import { getJwtToken } from "../jwtToken";
import router from "../../router";
import  env  from "../../../env"

export class HttpRequest {
  url = "";
  token = "";
  method = "";
  body = {};
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  static getBaseUrl() {
    return env.baseUrl;
  }

  static build() {
    return new HttpRequest(env.baseUrl);
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setBody(body) {
    this.body = body;
    return this;
  }

  async request() {
    console.group(`Requisição ${this.method} para ${this.url}`);
    this.setToken();
    await this.evaluateToken();
    const { baseUrl, url } = this;
    const requestUrl = baseUrl + url;
    const options = this.getOptions();
    return fetch(requestUrl, options)
      .then(this.treatResponseFunction())
      .catch((e) => console.error(e))
      .finally(() => console.groupEnd);
  }

  setToken() {
    this.token = getJwtToken();
  }

  async evaluateToken() {
    if (!this.token && router.app.$route.name !== "Login") {
      // await router.replace("/");
    }
  }

  getOptions() {
    const { method, body } = this;
    const redirect = "follow";
    const headers = this.getHeaders();
    const options = { method, headers, redirect };
    const jsonBody = JSON.stringify(body);
    if (jsonBody !== "{}") {
      options.body = jsonBody;
    }
    return options;
  }

  getHeaders() {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "application/json");
    return headers;
  }

  treatResponseFunction() {
    return async (response) => {
      const status = response.status;
      await this.evaluateIfResponseStatusWasUnauthorized(response);
      const data = this.getResponseData(await response.text());
      // Object.keys(JSON.parse(JSON.stringify(localStorage))).forEach((l) =>
      //   localStorage.removeItem(l)
      // );
      // await router.replace("/mensagens");
      return { data, status };
    };
  }

  async evaluateIfResponseStatusWasUnauthorized(response) {
    if (response.status === 401) {
      Object.keys(JSON.parse(JSON.stringify(localStorage))).forEach((item) =>
        localStorage.removeItem(item)
      );
      // await router.replace("/");
      throw new Error("The token has expired or the credentials are invalid.");
    }
  }

  getResponseData(responseText) {
    try {
      return JSON.parse(responseText);
    } catch (e) {
      if (
        e.message
          .trim()
          .match(/Unexpected\s*token\s*\w+\s*in\s*JSON\s*at\s*position\s*\d/)
      ) {
        return responseText;
      }
      return "";
    }
  }
}
