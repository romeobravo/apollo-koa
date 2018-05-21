import * as dotenv from 'dotenv'
dotenv.config()

import * as koa from 'koa'
import * as koaCors from 'koa2-cors'
import * as koaRouter from 'koa-router'
import * as koaBody from 'koa-bodyparser'
import { graphqlKoa } from 'apollo-server-koa'
import { schema } from './schema'
import { Prisma } from './generated/prisma'

const app = new koa()
const router = new koaRouter()
const port = process.env.PORT

app.use(koaBody())

app.use((ctx, next) => {
  const start = Date.now()
  return next().then(() => {
    const ms = Date.now() - start
    console.log(`${ctx.request.body} - ${ms}ms`)
  })
})

router.post(
  '/',
  graphqlKoa({
    schema,
    context: (req: any) => ({
      ...req,
      db: new Prisma({
        endpoint: process.env.PRISMA_ENDPOINT,
      }),
    }),
  })
)

router.get(
  '/',
  graphqlKoa({
    schema,
    context: (req: any) => ({
      ...req,
      db: new Prisma({
        endpoint: process.env.PRISMA_ENDPOINT,
      }),
    }),
  })
)

app.use(koaCors({ origin: '*' }))
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(port)

console.log(`SERVER STARTED ON PORT ${port}`)
