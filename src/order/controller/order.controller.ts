import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Put,
  Body,
  Param,
} from "@nestjs/common";
import { OrderService } from "../service/order.service";
import { OrderEntity } from "../order.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("api/v1/order")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async order(@Request() req): Promise<OrderEntity> {
    return this.orderService.order(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Request() req): Promise<OrderEntity[]> {
    return await this.orderService.getOrders(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateOrder(
    @Param() id: number,
    @Body() body,
    @Request() req
  ): Promise<OrderEntity> {
    const { payed } = body;
    return await this.orderService.updateOrder(id, req.user.username, payed);
  }
}
