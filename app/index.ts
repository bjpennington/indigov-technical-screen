import http from "http";

const PORT: number = 3000

http
  .createServer()
  .listen(PORT)
  .on("listening", () => console.log(`app is running at ${PORT}`));
