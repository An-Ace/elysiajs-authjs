import { Elysia } from "elysia";
import createRouter from "express-file-routing"

const app = new Elysia();
await createRouter(app)
app.listen(3000)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
