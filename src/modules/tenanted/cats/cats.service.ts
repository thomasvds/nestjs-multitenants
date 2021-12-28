import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './cat.entity';
import { CONNECTION } from '../../tenancy/tenancy.symbols';

@Injectable()
export class CatsService {
  private readonly catsRepository: Repository<Cat>;

  constructor(
    @Inject(CONNECTION) connection: Connection,
  ) {
    this.catsRepository = connection.getRepository(Cat);
  }

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat();
    cat.name = createCatDto.name;

    return this.catsRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }
}
