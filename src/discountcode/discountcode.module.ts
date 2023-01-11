import { Module } from "@nestjs/common";
import { DiscountcodeController } from "./controller/discountcode.controller";
import { DiscountcodeService } from "./service/discountcode.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "../order/order.entity";
import { ProductEntity } from "../product/product.entity";
import { CartEntity } from "../cart/cart.entity";
import { OrderController } from "../order/controller/order.controller";
import { OrderService } from "../order/service/order.service";
import { CartService } from "../cart/service/cart.service";
import { ProductsService } from "../product/service/products.service";
import { DiscountcodeEntity } from "./discountcode.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiscountcodeEntity,
      OrderEntity,
      CartEntity,
      ProductEntity,
    ]),
  ],
  controllers: [DiscountcodeController],
  providers: [DiscountcodeService, OrderService, CartService, ProductsService],
})
export class DiscountcodeModule {}
