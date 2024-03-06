import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Admin, AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminServices: AdminsService) {}

  @Get()
  getAllAdmins(): Admin[] {
    return this.adminServices.finAll();
  }

  @Get(':id')
  getAdminById(@Param('id', ParseIntPipe) id: number): Admin {
    return this.adminServices.findOneById(id);
  }

  @Post()
  createAdmin(@Body() data): string {
    return this.adminServices.createAdmin(data);
  }
}
