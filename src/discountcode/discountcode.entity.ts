import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DiscountcodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ default: false })
  used: boolean;

  @Column()
  userId: string;

  @Column({ default: 0 })
  discount: number;
}
