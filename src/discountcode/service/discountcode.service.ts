import {
  HttpException,
  HttpStatus,
  Injectable,
  PreconditionFailedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "../../order/order.entity";
import { Repository } from "typeorm";
import { CartService } from "../../cart/service/cart.service";
import { DiscountcodeEntity } from "../discountcode.entity";
import { OrderService } from "../../order/service/order.service";

@Injectable()
export class DiscountcodeService {
  constructor(
    @InjectRepository(DiscountcodeEntity)
    private discountcodeRepository: Repository<DiscountcodeEntity>,
    private orderService: OrderService,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>
  ) {}

  async generateDiscountcode(user: string): Promise<DiscountcodeEntity> {
    const completedOrderCountForUser =
      await this.orderService.getCompletedOrderCount(user);
    if (completedOrderCountForUser % 3 === 0) {
      const discountcode = { code: this.makeid(5), userId: user };
      return this.discountcodeRepository.save(discountcode);
    } else {
      throw new PreconditionFailedException({
        status: HttpStatus.OK,
        error: "Discount Code could not generated!!",
      });
    }
  }

  async generateStats(): Promise<any> {
    const completedOrders = await this.orderService.getTotalOrderCount();
    const totalPurchasedAmount = await this.orderService.getTotalPurchaseAmount();
    const couponItems = await this.discountcodeRepository.find()
    const couponList = [];
    let discountAmount = 0
    couponItems.map((item) => {
      couponList.push(item.code);
      if(item.used) {
        discountAmount += item.discount
      }
    });
    return {orderCount: completedOrders, totalPurchasedAmount: totalPurchasedAmount, listOfCoupons: couponList, discountAmout: discountAmount};
  }

  async applyDiscountCode(code: string, user: string, orderId: number): Promise<any> {
    const discountCouponList = await this.discountcodeRepository.findBy({code: code, userId: user, used: false});

    if(discountCouponList.length===1) {
      const order = await this.orderService.getOrderById(orderId);
      const discount = order.subTotal*0.1;
      order.subTotal = order.subTotal*0.9;
      await this.orderRepository.save(order);
      const discountCode = discountCouponList[0];
      discountCode.used = true;
      discountCode.discount = discount;
      await this.discountcodeRepository.save(discountCode);
      return {
        status: HttpStatus.OK,
        error: "Discount Code Applied!!",
      };
    } else {
      throw new PreconditionFailedException({
        status: HttpStatus.OK,
        error: "Discount Code does not exists or expired!!",
      });
    }
  }

  makeid(length): string {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
