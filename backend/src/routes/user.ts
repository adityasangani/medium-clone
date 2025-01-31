import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@adityasangani/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(token);
  } catch (e) {
    return c.status(403);
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ message: "Incorrect credentials" });
    } else {
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.text(token);
    }
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("invalid");
  }
});

userRouter.get("/profile", async (c) => {
  const userEmail = c.req.query("email") || "";
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        name: true,
        email: true,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ message: "User not found" });
    } else {
      return c.json(user);
    }
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text("invalid");
  }
});
