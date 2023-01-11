import {
  HttpStatus,
  Injectable,
  PreconditionFailedException,
} from "@nestjs/common";
import { OrderEntity } from "../order.entity";
import { Repository, getManager, getConnection } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CartService } from "src/cart/service/cart.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private cartService: CartService
  ) {}

  async order(user: string): Promise<OrderEntity> {
    const cartItems = await this.cartService.getItemsInCart(user);
    if (cartItems.length > 0) {
      const userOrder = cartItems.filter((item) => item.userId === user);
      const subTotal = cartItems
        .map((item) => item.total)
        .reduce((acc, next) => acc + next);
      const order = { items: userOrder, subTotal: subTotal, userId: user };
      return this.orderRepository.save(order);
    } else {
      throw new PreconditionFailedException({
        status: HttpStatus.OK,
        error: "Empty cart!!",
      });
    }
  }

  async getOrders(user: string): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find();
    return orders.filter((item) => item.userId === user);
  }

  async updateOrder(
    orderId: number,
    user: string,
    payed: boolean
  ): Promise<OrderEntity> {
    const userOrder = await this.orderRepository.findOneBy({
      id: orderId["id"],
      userId: user,
    });
    userOrder.payed = payed;
    return this.orderRepository.save(userOrder);
  }

  async getCompletedOrderCount(user: string): Promise<number> {
    return this.orderRepository.countBy({ userId: user, payed: true });
  }

  async getTotalOrderCount(): Promise<number> {
    return this.orderRepository.countBy({payed: true});
  }

  async getTotalPurchaseAmount(): Promise<number> {
    const totalOrders = await this.orderRepository.findBy({payed: true});
    const subTotal = totalOrders
      .map((item) => item.subTotal)
      .reduce((acc, next) => acc + next);
    return subTotal;
  }

  async getOrderById(id: number): Promise<OrderEntity> {
    return this.orderRepository.findOneBy({id:id});
  }
}
