import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminServices: AdminsService) {}

  @Get()
  getAllAdmins() {
    return this.adminServices.finAll();
  }

  @Get(':id')
  getAdminById(@Param('id', ParseIntPipe) id: number) {
    return this.adminServices.findOneById(id);
  }

  @Post()
  createAdmin(@Body() data) {
    return this.adminServices.createAdmin(data);
  }
}
