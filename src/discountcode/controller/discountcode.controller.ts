import { Body, Controller, Get, Post, Put, Request, UseGuards } from "@nestjs/common";
import { OrderService } from "../../order/service/order.service";
import { DiscountcodeService } from "../service/discountcode.service";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { OrderEntity } from "../../order/order.entity";

@Controller("api/v1/discountcode")
export class DiscountcodeController {
  constructor(private discountcodeService: DiscountcodeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async generateDiscountcode(@Request() req, @Body() body): Promise<any> {
    const { user } = body;
    return this.discountcodeService.generateDiscountcode(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/stats")
  async getStats(@Request() req): Promise<any> {
    return this.discountcodeService.generateStats();
  }

  @UseGuards(JwtAuthGuard)
  @Put("/apply")
  async applyDiscountCode(@Request() req, @Body() body): Promise<any> {
    const {orderId, code} = body;
    return this.discountcodeService.applyDiscountCode(code, req.user.username, orderId);
  }


}
