import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';

const USER_DATA: any = [
  { id: 1, username: 'admin', title: 'dino', password: '123456' },
];

@Injectable()
export class UsersService {
  async getUser() {
    try {
      if (!USER_DATA.length) throw new Error('no data');

      return {
        success: true,
        data: USER_DATA,
      };
    } catch (error) {
      throw new NotFoundException({
        success: false,
        message: error.message,
      });
    }
  }

  async addUser(body: UserCreateDto) {
    try {
      const { username, title, password } = body;

      const find = USER_DATA.find(e => e.username === username);

      if (find) throw new Error('มีผู้ใช้งานซ้ำ.');

      USER_DATA.push({
        id: USER_DATA.length + 1,
        username: username,
        title: title,
        password: password,
      });

      return {
        success: true,
        message: 'add success.',
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: error.message,
      });
    }
  }

  async update(id: number, body: UserCreateDto) {
    try {
      const { username, password, title, email } = body;

      const find = USER_DATA.find(e => e.id == id);
      if (!find) throw new Error('not found.');

      find.title = title;
      find.email = email;

      return {
        success: true,
        message: 'updated success.',
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: error.message,
      });
    }
  }
}
