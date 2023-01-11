import { Injectable } from "@nestjs/common";
import { IsNull, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CartEntity } from "../cart.entity";
import { ProductsService } from "src/product/service/products.service";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    private productsService: ProductsService
  ) {}

  async addToCart(
    productId: number,
    quant: number,
    user: string
  ): Promise<any> {
    const cartItems = await this.cartRepository.find({
      relations: ["order"],
      where: {
        userId: user,
        order: IsNull(),
      },
    });
    const product = await this.productsService.getOne(productId);

    if (product) {
      //confirm if item is exists in the cart
      const cart = cartItems.filter(
        (item) => item.productId === productId && item.userId === user
      );
      if (cart.length < 1) {
        const newItem = {
          productId: product.id,
          price: product.price,
          quantity: quant,
          total: product.price * quant,
          userId: user,
        };
        return await this.cartRepository.save(newItem);
      } else {
        //Update the item quantity
        const quantity = (cart[0].quantity += quant);
        const total = cart[0].price * quantity;

        return await this.cartRepository.update(cart[0].id, {
          quantity,
          total,
        });
      }
    }
    return null;
  }
  async getItemsInCart(user: string): Promise<CartEntity[]> {
    const items = await this.cartRepository.find({
      relations: ["order"],
      where: {
        userId: user,
        order: IsNull(),
      },
    });
    return items;
  }
}
