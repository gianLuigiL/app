import store from "../store/index";

const base = (method, url, data) => {
  const body = data ? JSON.stringify(data) : "";
  if (method === "GET")
    return fetch(url, {
      headers: {
        "CSRF-Token": store.getters["user/CSRFToken"],
        "Content-Type": "application/json"
      }
    });
  else
    return fetch(url, {
      method,
      body,
      headers: {
        "CSRF-Token": store.getters["user/CSRFToken"],
        "Content-Type": "application/json"
      }
    });
};

export default async (method = "GET", url = "/", data) =>
  await base(method, url, data).then(res => res.json());
