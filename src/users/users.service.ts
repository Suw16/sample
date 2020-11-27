import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';

const USER_DATA: any = [
  { id: 1, sku_code: '0000', sku_name: 'mouse', owner_product: 'mike' ,quantity:1},
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
      const { sku_code, sku_name,owner_product,quantity} = body;

      const find = USER_DATA.find(e => e.sku_code === sku_code);
      

      if (find) throw new Error('มีรหัสสินค้าซ้ำ.');
      
      USER_DATA.push({
        id: USER_DATA.length + 1,
        sku_code: sku_code,
        sku_name:sku_name,
        owner_product:owner_product,
        quantity: quantity,
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
      const { sku_code, sku_name ,quantity} = body;

      const find = USER_DATA.find(e => e.id == id);

      if (!find) throw new Error('not found.');
      if(find.quantity +quantity < 0) throw new Error('สินค้าไม่พอ')
       find.sku_code = sku_code;
       find.sku_name = sku_name;
       find.quantity = find.quantity + quantity;

      return {
        success: true,
        message: 'updated success.',
        data :USER_DATA
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: error.message,
      });
    }
  }
}
