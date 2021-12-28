import { AbstractEntity } from '../../../abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'cats'})
export class Cat extends AbstractEntity {
  @Column()
  name: string;
}
