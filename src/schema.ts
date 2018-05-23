import * as fs from 'fs'
import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import { Prisma } from './generated/prisma'

interface Context {
  db: Prisma
  request: any
}

const resolvers = {
  Query: {
    feed(parent, args, context: Context, info) {
      return context.db.query.posts({ where: { isPublished: true } }, info)
    },
    drafts(parent, args, context: Context, info) {
      return context.db.query.posts({ where: { isPublished: false } }, info)
    },
    post(parent, { id }, context: Context, info) {
      return context.db.query.post({ where: { id: id } }, info)
    },
  },
  Mutation: {
    createDraft(parent, { title, text, user }, context: Context, info) {
      return context.db.mutation.createPost({ data: { title, text, user: { connect: { id: user } } } }, info)
    },
    deletePost(parent, { id }, context: Context, info) {
      return context.db.mutation.deletePost({ where: { id } }, info)
    },
    publish(parent, { id }, context: Context, info) {
      return context.db.mutation.updatePost(
        {
          where: { id },
          data: { isPublished: true },
        },
        info
      )
    },
  },
}

export const schema = makeExecutableSchema({
  typeDefs: importSchema('src/schema.graphql'),
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
})
