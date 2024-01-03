# Elysia JS with @auth/core & Prisma ORM

This is an example of - [elysiajs](https://github.com/elysiajs/elysia) with [@auth/core](https://github.com/nextauthjs/next-auth) & [Prisma-ORM](https://github.com/prisma/prisma)

## Installaton
To get started with this template, simply paste this command into your terminal:

```bash
bun install (windows-wsl/linux)
```

- Change .env.example to .env
- Set All your Configurations in .env
then

```bash
bunx prisma migrate dev (linux)
  or
npx prisma migrate dev (windows-cmd)
```

## Run as Development
To start the development server run:
```bash
bun run dev (windows-wsl/linux)
```

Open http://localhost:3000/ if works, then open


```url
GET: http://localhost:3000/seed 
```
**For seeding data**

## The final step
- open http://localhost/auth/signin
- open http://localhost/auth/session if you have signed in
