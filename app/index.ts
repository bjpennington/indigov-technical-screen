import http, { RequestListener } from "http";
import requestHandler from "./handler";

const PORT: number = 3000;

http
  .createServer(requestHandler)
  .listen(PORT)
  .on("listening", () => console.log(`app is running at ${PORT}`));
