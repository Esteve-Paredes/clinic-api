import { Injectable } from '@nestjs/common';
import { Admin, AdminDocument } from './schema/admins.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private adminModule: Model<AdminDocument>,
  ) {}

  async finAll() {
    return await this.adminModule.find();
  }

  async findOneById(id: number) {
    return;
  }

  createAdmin(adminData): string {
    return;
  }
}
