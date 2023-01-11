import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "./cart/cart.module";
import { OrderModule } from "./order/order.module";
import { DiscountcodeModule } from "./discountcode/discountcode.module";

@Module({
  imports: [
    AuthModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "ecommerceStoreDB",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    CartModule,
    OrderModule,
    DiscountcodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
console.log([__dirname + "/**/*.entity{.ts,.js}"]);
