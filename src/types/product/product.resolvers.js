import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

export default {
  Product: {
    __resolveType(product) {},
    async createdBy(product, args) {
      try {
        const user = await User.findById(product.createdBy)
        return user._id
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  Query: {
    async products() {
      try {
        return await Product.find({})
      } catch (error) {
        throw new Error(error)
      }
    },
    async product(_, args) {
      try {
        return await Product.findById(args.id)
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  Mutation: {
    async newProduct(_, args, ctx) {
      try {
        return await Product.create({
          ...args.input,
          createdBy: ctx.user._id
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    async removeProduct(_, args) {
      try {
        const product = await Product.findById(args.id)
        return await product.remove()
      } catch (error) {
        throw new Error(error)
      }
    },
    async updateProduct(_, args) {
      try {
        await Product.findOneAndUpdate({ _id: args.id }, { $set: args.input })
        return await Product.findById(args.id)
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
