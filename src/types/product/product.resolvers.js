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
    createdBy(product) {
      return product.creat
    }
  },
  Query: {
    products() {
      return Product.find({}).exec()
    },
    product(_, args) {
      return Product.find({ _id: args.id }).exec()
    }
  },
  Mutation: {
    newProduct(_, args) {
      Product.create(args.input, (err, product) => {
        if (err) {
          throw err
        }
        if (!product) {
          throw new Error('could not make the new product')
        }
        return product
      })
    },
    removeProduct(_, args) {
      Product.findById(args.id, (err, product) => {
        if (err) {
          throw err
        }
        if (!product) {
          throw new Error('could not find product to remove')
        }
        return product.remove()
      })
    },
    updateProduct(_, args) {
      Product.findById(args.id, (err, product) => {
        if (err) {
          throw err
        }
        if (!product) {
          throw new Error('could not find prod to update the product')
        }
        product.update(args, (err, updatedProduct) => {
          if (err) {
            throw err
          }
          if (!updatedProduct) {
            throw new Error('could not update the product')
          }
          return updatedProduct
        })
      })
    }
  },
  Product: {
    __resolveType(product) {}
  }
}
