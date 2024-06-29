import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// app.use('api/v1/blog/*', async (c, next) => {
//   const token = c.req.header("authorization");
//   const checker = await verify(token, c.env.JWT_SECRET);
//   await next();
// })

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    return c.status(403);
  }
});
app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user) {
    return c.json({ error: "User not found" });
  } else {
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  }
});
app.post("/api/v1/blog", (c) => {
  return c.text("Post blog");
});
app.put("/api/v1/blog", (c) => {
  return c.text("put blog");
});
app.get("/api/v1/blog:id", (c) => {
  const id = c.req.param("id");
  return c.text("get blog with id");
});
app.get("/api/v1/blog/bulk", (c) => {
  return c.text("get all blogs");
});
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
