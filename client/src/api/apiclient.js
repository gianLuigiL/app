const base = (method, url, data) => {
    const body = data ? JSON.stringify(data) : "";
    if (method === "GET")
        return fetch(url, {
            headers: {
                "CSRF-Token": "92yPkYxv-VWFKB5-tjPTeRya69d_9yGx46Ws",
                "Content-Type": "application/json"
            }
        });
    else
        return fetch(url, {
            method,
            body,
            headers: {
                "CSRF-Token": "92yPkYxv-VWFKB5-tjPTeRya69d_9yGx46Ws",
                "Content-Type": "application/json"
            }
        });
};

export default async (method = "GET", url = "/", data) => await base(method, url, data).then(res => res.json());