
type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

async function sendRequest(method: HttpMethod, url: string, body?: any) {
  let options: any = {
    method: method as string,
    headers: {
      'Content-Type': 'application/json'
    },
  };
  if (method === "POST" || method === "PATCH") {
    options.body = body;
  }
  let result = await fetch(`http://localhost:3000${url}`, options);
  let json = await result.json();
  if (!result.ok) {
    throw new Error(json.message);
  }
  return json;
}

export function httpGet(url: string) {
  return sendRequest("GET", url);
}

export function httpPost(url: string, body: any) {
  return sendRequest("POST", url, JSON.stringify(body));
}

export function httpPatch(url: string, body: any) {
  return sendRequest("PATCH", url, JSON.stringify(body));
}

export function httpDelete(url: string) {
  return sendRequest("DELETE", url);
}
