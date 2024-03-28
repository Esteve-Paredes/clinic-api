import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
      if (!adminId) throw new NotFoundException('id no encontrado');
      return adminId;
    } catch (error) {
      if (error instanceof BadRequestException)
        throw new BadRequestException(error.message);
      if (error instanceof UnauthorizedException)
        throw new UnauthorizedException(error.message);
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message);
      throw new InternalServerErrorException(error);
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
