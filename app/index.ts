import http, { RequestListener } from "http";
import { parse } from "url";

const PORT: number = 3000;

const DEFAULT_HEADERS = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
};

const notFoundHandler: RequestListener = (_request, response) => {
  response.writeHead(404, DEFAULT_HEADERS);
  response.write(
    JSON.stringify({
      message: "Not found",
    }),
  );
  response.end();
};

const serverErrorHandler: RequestListener = (_request, response) => {
  response.writeHead(500, DEFAULT_HEADERS);
  response.write(JSON.stringify({ error: "Internal server error" }));
  response.end();
};

const router: Record<string, RequestListener> = {
  notFound: notFoundHandler,
};

const requestHandler: RequestListener = async (request, response) => {
  const { url, method } = request;
  const { pathname } = parse(url ?? "", true);

  const routeKey = `${pathname}:${method?.toLowerCase()}`;
  const routeHandler = router[routeKey] ?? router.notFound;

  try {
    await routeHandler(request, response);
  } catch (error) {
    console.error(`Request to ${url} failed`, error);
    serverErrorHandler(request, response);
  }
};

http
  .createServer(requestHandler)
  .listen(PORT)
  .on("listening", () => console.log(`app is running at ${PORT}`));
