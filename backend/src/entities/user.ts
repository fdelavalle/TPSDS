import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class User {

  @PrimaryKey()
  uuid = v4()

  @Property()
  username: string;

  @Property()
  password: string;

  @Property()
  balance: number;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.balance = 10000;
  }
}