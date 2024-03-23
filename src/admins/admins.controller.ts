import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminServices: AdminsService) {}

  @Get()
  async getAllAdmins() {
    return await this.adminServices.finAll();
  }

  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    return await this.adminServices.findOneById(id);
  }

  @Post()
  async createAdmin(@Body() adminData: CreateAdminDto) {
    return await this.adminServices.create(adminData);
  }

  @Patch(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() adminData: Partial<CreateAdminDto>,
  ) {
    return await this.adminServices.update(id, adminData);
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    return await this.adminServices.delete(id);
  }
}
