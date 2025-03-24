import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'tb_user'
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  age: number

  @Column()
  document: string
}