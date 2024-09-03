import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import LinkedInApply from "./actions/apply.mjs";

const dev = process.env.NOVE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("a user connected.");
    socket.on("servicestart", (un, pw) => {
      LinkedInApply(socket, un, pw);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
