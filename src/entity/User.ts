import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 100, unique: true})
  username: string;

  @Column("varchar", {length: 100, unique: true})
  email: string;

  @Column("varchar", {length: 100, unique: true})
  password: string;

  static createNew(username: string, email: string, password: string) {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    return user.save();
  }
}