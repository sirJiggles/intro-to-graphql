import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

const authCheck = function(ctx) {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
}

const adminCheck = function(ctx) {
  if (ctx.user.role !== 'admin') {
    throw new AuthenticationError()
  }
}

/** product */
const product = (_, args, ctx) => {
  authCheck(ctx)
  return Product.findById(args.id)
    .lean()
    .exec()
}

const newProduct = (_, args, ctx) => {
  authCheck(ctx)
  adminCheck(ctx)
  return Product.create({ ...args.input, createdBy: ctx.user })
}

const products = (_, args, ctx) => {
  authCheck(ctx)
  return Product.find({})
    .lean()
    .exec()
}

const updateProduct = (_, args, ctx) => {
  authCheck(ctx)
  adminCheck(ctx)
  const update = args.input
  return Product.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeProduct = (_, args, ctx) => {
  authCheck(ctx)
  adminCheck(ctx)
  return Product.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    products,
    product
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct
  },
  Product: {
    __resolveType(product) {
      return productsTypeMatcher[product.type]
    },
    createdBy(product) {
      return User.findById(product.createdBy)
        .lean()
        .exec()
    }
  }
}
