import { Order, OrdersProducts, OrdersStore } from '../../models/orders'
import { User, UsersStore } from '../../models/users'
import { ProductsStore } from '../../models/products'

const orders = new OrdersStore()
const users = new UsersStore()
const products = new ProductsStore()

const createdOrder: Order = {
  id: 1,
  user_id: 1,
  order_status: 'active',
}

const createdProductOrder: OrdersProducts = {
  id: 1,
  order_id: 1,
  product_id: 1,
  product_quantity: 5,
}

describe('Orders Model is Working and Exist', () => {
  beforeAll(async () => {
    let usrResult = await users.show(1)

    if (usrResult !== undefined) {
      createdOrder.user_id = (usrResult as unknown as User).id
    } else {
      usrResult = (await users.create(
        'Test2@test.com',
        'test2',
        'tester2',
        'password123456'
      )) as User
    }
    const pdResult = await products.create(
      'LG TV 55inches',
      5000,
      'Electronices'
    )
    if (pdResult.id) {
      createdProductOrder.product_id = pdResult.id
    }
  })
  describe('Create Method', () => {
    it('Created method must be existed', () => {
      expect(orders.create).toBeDefined()
    })
    it('Order should be created for the User made it', async () => {
      const result = await orders.create(1)
      result.user_id = Number(result.user_id)
      console.log(result)
      createdOrder.id = result.id
      expect(result).toEqual(createdOrder)
    })
  })
  describe('Show Method', () => {
    it('Show method must be existed', () => {
      expect(orders.show).toBeDefined()
    })
    it('Order row should be returned when the order id and the order status is given', async () => {
      const result = await orders.show(1, 'active')
      result.user_id = Number(result.user_id)
      createdOrder.id = result.id
      expect(result).toEqual(createdOrder)
    })
  })
  describe('Orders - Products is Working and Exist', () => {
    describe('AddProduct Method', () => {
      it('AddProduct method must be existed', () => {
        expect(orders.addProduct).toBeDefined()
      })
      it('Product Should be added to the order', async () => {
        const result = await orders.addProduct(createdOrder.id, 1, 5)
        result.order_id = Number(result.order_id)
        createdProductOrder.id = result.id
        createdProductOrder.order_id = createdOrder.id
        createdProductOrder.product_id = result.product_id
        expect(result).toEqual(createdProductOrder)
      })
    })
  })
})
