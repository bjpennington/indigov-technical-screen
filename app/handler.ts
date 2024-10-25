import { RequestListener } from "http";
import { fileURLToPath, parse } from "url";
import { generateConstituentsModule } from "./modules/constituents/constituents.factory";
import { dirname, join } from "path";

export type Router = Record<string, RequestListener>;

export const DEFAULT_HEADERS = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
};

const rootHandler: RequestListener = (_request, response) => {
  response.writeHead(200, DEFAULT_HEADERS);
  response.write(JSON.stringify({ message: "Hello world!" }));
  response.end();
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

const currentDir = dirname(fileURLToPath(import.meta.url));
const databasePath = join(currentDir, "..", "database", "data.json");

const router: Router = {
  ...generateConstituentsModule({ databasePath }),
  "get:/": rootHandler,
  notFound: notFoundHandler,
};

export default requestHandler;
