import { RequestListener } from "http";
import { parse } from "url";
import { generateConstituentsModule } from "./modules/constituents/constituents.factory";

export type Router = Record<string, RequestListener>;

export const DEFAULT_HEADERS = {
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

const requestHandler: RequestListener = async (request, response) => {
  const { url, method } = request;
  const { pathname } = parse(url ?? "", true);

  const routeKey = `${method?.toLowerCase()}:${pathname}`;
  const routeHandler = router[routeKey] ?? router.notFound;

  try {
    await routeHandler(request, response);
  } catch (error) {
    console.error(`Request to ${url} failed`, error);
    serverErrorHandler(request, response);
  }
};

const router: Router = {
  ...generateConstituentsModule({ db: "" }),
  notFound: notFoundHandler,
};

export default requestHandler;
