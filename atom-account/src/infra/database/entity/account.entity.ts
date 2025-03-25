import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'account',
})
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  balance: number;
}