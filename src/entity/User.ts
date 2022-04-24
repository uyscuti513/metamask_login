import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  nonce: string;

  @Column()
  publicAddress: string;

  @CreateDateColumn() 
  createdAt: Date;
}
