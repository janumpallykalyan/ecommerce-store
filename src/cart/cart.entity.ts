import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderEntity } from "src/order/order.entity";

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  total: number;

  @Column()
  userId: string;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;
}
