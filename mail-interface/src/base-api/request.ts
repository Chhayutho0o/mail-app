import axios from "axios";
import { cookies } from "next/headers";

interface myHeader {
  "Content-Type": string;
  Accept: string;
  Authorization?: string;
  "accept-language": string;
}

const requestConfig = {
  baseURL: process.env.BASE_URL,
};

export const setAuthToken = (token: any) => {
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};

export const makeHeaders = (token: any) => {
  const locale = cookies().get("NEXT_LOCALE")?.value || "en";
  const headers: myHeader = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "accept-language": locale,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export function makeRequest(method: any, path: any, params: any, headers: any) {
  const extra =
    method.toLocaleLowerCase() === "get" ? { params } : { data: params };

  return {
    ...requestConfig,
    headers,
    method,
    url: path,
    ...extra,
  };
}

export const GET = (path: any, params: any, token?: any) => {
  const headers = makeHeaders(token);
  return makeRequest("get", path, params, headers);
};

export function DELETE(path: any, params?: any, token?: any) {
  const headers = makeHeaders(token);
  return makeRequest("DELETE", path, params, headers);
}

export function PUT(path: any, params: any, token?: any) {
  const headers = makeHeaders(token);
  const isFormData = params instanceof FormData;
  headers["Accept"] = isFormData ? "multipart/form-data" : "application/json";
  headers["Content-Type"] = isFormData
    ? "multipart/form-data"
    : "application/json";
  return makeRequest("put", path, params, headers);
}

export function PATCH(path: any, params: any, token: any) {
  const headers = makeHeaders(token);
  const isFormData = params instanceof FormData;
  headers["Accept"] = isFormData ? "multipart/form-data" : "application/json";
  headers["Content-Type"] = isFormData
    ? "multipart/form-data"
    : "application/json";
  return makeRequest("patch", path, params, headers);
}

export function POST(path: any, params: any, token?: any) {
  const headers = makeHeaders(token);
  const isFormData = params instanceof FormData;
  headers["Accept"] = isFormData ? "multipart/form-data" : "application/json";
  headers["Content-Type"] = isFormData
    ? "multipart/form-data"
    : "application/json";
  return makeRequest("post", path, params, headers);
}

export function fetchJson(req: any) {
  return axios(req)
    .then((response: any) => {
      return Promise.resolve(response);
    })
    .catch((error: any) => {
      const response = error.response;
      const status = response ? response.status : 500;
      switch (status) {
        case 500:
        case 502:
        case 503:
        case 504:
          break;
        case 401:
          break;
        default:
          break;
      }
      return Promise.reject(
        new APIError(response, (response && response.data) || null)
      );
    });
}

export class APIError extends Error {
  code = null;
  message = "";
  response;
  detail;
  constructor(resp: any, json: any) {
    super();
    this.name = "APIError";
    this.stack = new Error().stack;
    if (json) {
      this.message = json.message;
    } else {
      this.message = resp ? resp.statusText : "";
    }
    this.response = resp;
    this.detail = json;
  }
}
