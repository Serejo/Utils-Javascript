import { HttpRequest } from "./HttpRequest";
// import { getJwtToken } from "@/services/jwtToken";

export class HttpRestService {
  static get(url, queryStrings = {}) {
    Object.keys(queryStrings)
      .filter((key) => ![null, ""].includes(queryStrings[key]))
      .forEach((key, i) => {
        url += ["?", "&"][+!!i] + `${key}=${encodeURI(queryStrings[key])}`;
      });
    return HttpRequest.build()
      .setMethod("GET")
      .setUrl(encodeURI(url))
      .request();
  }

  static post(url, data) {
    return HttpRequest.build()
      .setMethod("POST")
      .setUrl(url)
      .setBody(data)
      .request();
  }

  static patch(url, data) {
    return HttpRequest.build()
      .setMethod("PATCH")
      .setUrl(url)
      .setBody(data)
      .request();
  }

  static put(url, data) {
    return HttpRequest.build()
      .setMethod("PUT")
      .setUrl(url)
      .setBody(data)
      .request();
  }

  static delete(url) {
    return HttpRequest.build().setMethod("DELETE").setUrl(url).request();
  }
}
