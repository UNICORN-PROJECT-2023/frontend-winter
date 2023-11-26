import { API_PREFIX } from "../constants/Api";

export async function get(url, customOptions) {
  const params = {
    method: "GET",
    url: url,
    customOptions: customOptions ? customOptions : undefined,
  };
  return fetchData(params);
}

export async function post(url, data, customOptions) {
  const params = {
    method: "POST",
    url: url,
    data: data,
    customOptions: customOptions ? customOptions : undefined,
  };
  return fetchData(params);
}

export async function put(url, data, customOptions) {
  const params = {
    method: "PUT",
    url: url,
    data: data,
    customOptions: customOptions ? customOptions : undefined,
  };
  return fetchData(params);
}

export async function patch(url, data, customOptions) {
  const params = {
    method: "PATCH",
    url: url,
    data: data,
    customOptions: customOptions ? customOptions : undefined,
  };
  return fetchData(params);
}

export async function remove(url, data, customOptions) {
  const params = {
    method: "DELETE",
    url: url,
    data: data,
    customOptions: customOptions ? customOptions : undefined,
  };
  return fetchData(params);
}

export async function getReplace(url, customOptions) {
  const params = {
    method: "GET",
    url: url,
    customOptions: customOptions,
    rewriteOptions: true,
  };
  return fetchData(params);
}

export async function postReplace(url, customOptions) {
  const params = {
    method: "POST",
    url: url,
    data: undefined,
    customOptions: customOptions,
    rewriteOptions: true,
  };
  return fetchData(params);
}

export async function putReplace(url, customOptions) {
  const params = {
    method: "PUT",
    url: url,
    data: undefined,
    customOptions: customOptions ? customOptions : undefined,
    rewriteOptions: true,
  };
  return fetchData(params);
}

export async function patchReplace(url, customOptions) {
  const params = {
    method: "PATCH",
    url: url,
    data: undefined,
    customOptions: customOptions ? customOptions : undefined,
    rewriteOptions: true,
  };
  return fetchData(params);
}

export function fetchData(props) {
  const { method, url, data, customOptions, rewriteOptions } = props;
  const useAuthorization = !rewriteOptions && localStorage.getItem("token");
  const useLanguage = !rewriteOptions && localStorage.getItem("language");

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${useAuthorization}` || "",
      "accept-language": useLanguage  || "en",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const fetchUrl = API_PREFIX + url;
  let fetchOptions;

  if (customOptions && !rewriteOptions) {
    fetchOptions = { ...options, ...customOptions };
  }

  if (rewriteOptions && rewriteOptions) {
    fetchOptions = customOptions;
  }

  // use default options
  if (fetchOptions === undefined) {
    fetchOptions = options;
  }

  const response = fetch(fetchUrl, fetchOptions);

  return response;
}
