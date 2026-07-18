export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = new URL("https://membership-management.replit.app");
    target.pathname = url.pathname;
    target.search = url.search;

    const response = await fetch(target.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
    });

    const newHeaders = new Headers(response.headers);
    newHeaders.delete("x-frame-options");
    newHeaders.delete("content-security-policy");

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  },
};
