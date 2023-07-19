import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LOGIN_TYPE } from 'src/common/enum/login-type.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = await this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(createUser);
    return await savedUser;
  }

  async findOneById(id: string) : Promise<User | null> {
    return await this.userRepository.findOneBy(({ id }))
  }

  async findOne(uid: string, loginType: LOGIN_TYPE) : Promise<User | null> {
    return await this.userRepository.findOneBy(({ uid, loginType }))
  }

  async updateDisplayName(id: string, displayName: string) {
    await this.userRepository.update(id, {displayName})
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
