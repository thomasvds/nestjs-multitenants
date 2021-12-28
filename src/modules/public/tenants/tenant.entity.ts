import { AbstractEntity } from '../../../abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tenants'})
export class Tenant extends AbstractEntity {
  @Column()
  name: string;
}
