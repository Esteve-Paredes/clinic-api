import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Admin } from './entity/admins.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async finAll(): Promise<Admin[]> {
    try {
      const allAdmins = await this.adminModel.find();
      return allAdmins;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al encontrar todos los admins',
      );
    }
  }

  async findOneById(id: string): Promise<Admin | null> {
    try {
      const adminId = await this.adminModel.findById(id);
      return adminId;
    } catch (error) {
      throw new InternalServerErrorException('Error al encontrar un admin');
    }
  }

  async create(adminData: CreateAdminDto): Promise<Admin> {
    try {
      const createdUser = new this.adminModel(adminData);
      return createdUser.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al crear un nuevo admin');
    }
  }

  async update(id: string, adminData: Partial<CreateAdminDto>): Promise<Admin> {
    try {
      const adminUpdate = await this.adminModel.findByIdAndUpdate(
        id,
        adminData,
        { new: true },
      );
      return adminUpdate;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar un admin');
    }
  }

  async delete(id: string): Promise<Admin | null> {
    try {
      const adminDelete = await this.adminModel.findByIdAndDelete(id);
      return adminDelete;
    } catch (error) {
      throw new InternalServerErrorException('Error al borrar un admin');
    }
  }
}
