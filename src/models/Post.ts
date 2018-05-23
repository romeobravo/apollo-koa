import { Prisma, Post as IPost, User as IUser } from '../generated/prisma'

class Model {
  public data
  public type

  private db = new Prisma({
    endpoint: process.env.PRISMA_ENDPOINT,
  })

  public constructor(data?: any) {
    this.data = data ? data : {}
  }

  public static async find(id: string) {
    const model = new this()
    await model.load(id)
    return model
  }

  public async load(id) {
    const data = await this.db.query[this.type]({ where: { id: id } })
    this.data = data
    return this
  }

  public async save(info?: any) {
    return this.db.mutation[this.updateFunctionName](
      {
        where: { id: this.data.id },
        data: this.updateData,
      },
      info
    )
  }

  private get updateData() {
    const updateData = Object.assign({}, this.data)
    delete updateData.id
    return updateData
  }

  private get updateFunctionName() {
    return 'update' + this.constructor.name
  }

  private get initialized() {
    return this.data.id
  }
}

function has(target, key) {
  let value = target[key]

  const getter = async function() {
    if (!this.initialized) return null

    return new value(
      await this.db.query[this.type]({ where: { id: this.data.id } }, '{ user { id } }')
    )
  }

  const setter = function(newValue) {
    value = newValue
  }

  console.log(target, key)

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
  })
}

class User extends Model {
  constructor(user?: IUser) {
    super(user)
  }
}

class Post extends Model {
  public type = 'post'

  @has user = User

  public constructor(post?: IPost) {
    super(post)
  }
}

export { Post }
