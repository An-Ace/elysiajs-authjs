# Elysia JS with @auth/core & Prisma ORM

This is an example for - [elysiajs](https://www.github.com/octokatherine) with [@auth/core](https://github.com/nextauthjs/next-auth) & [Prisma-ORM](https://github.com/prisma/prisma)

## Installaton
To get started with this template, simply paste this command into your terminal:

```bash
bun install
```

- Change .env.example to .env
- Set All your Configurations in .env
then

```bash
bunx prisma migrate dev (Linux)
  or
npx prisma migrate dev (windows-wsl)
```

## Run as Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ if works, then open


```url
GET: http://localhost:3000/seed 
```
**To seeding data**

## The final step
- open http://localhost/auth/signin
- open http://localhost/auth/session if you have signed in
## Authors

- [@octokatherine](https://www.github.com/octokatherine)

