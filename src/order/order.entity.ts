import {
  Entity,
  OneToMany,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartEntity } from "../cart/cart.entity";

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartEntity, (cart) => cart.order)
  items: CartEntity[];

  @Column()
  subTotal: number;

  @Column({ default: false })
  payed: boolean;

  @Column()
  userId: string;
}
