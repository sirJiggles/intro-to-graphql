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
  Query: {
    // info is AST
    // context is context of the app
    // args are args it was called with
    // _ we are not using right now but will look at shortly
    getData(_, args, context, info) {
      return Product.findById(args.id)
    }
  },
  Mutation: {},
  Product: {
    __resolveType(product) {}
  }
}
