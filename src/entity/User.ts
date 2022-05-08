import { randomUUID, RandomUUIDOptions } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false
  })
  username: string;

  @Column({
    nullable: false
  })
  nonce: string;

  @Column({
    unique: true,
    nullable: false
  })
  public_address: string;

  @CreateDateColumn({
    nullable:false
  }) 
  created_at: Date;
}
