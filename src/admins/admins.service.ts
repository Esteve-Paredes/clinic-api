import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AdminsService {
  private admins = [
    {
      id: 1,
      name: 'User1',
      lastname: 'Userlasname1',
      email: 'user1@mail.com',
    },
    {
      id: 2,
      name: 'User2',
      lastname: 'Userlasname2',
      email: 'user2@mail.com',
    },
    {
      id: 3,
      name: 'User3',
      lastname: 'Userlasname3',
      email: 'user3@mail.com',
    },
  ];

  finAll() {
    return this.admins;
  }

  findOneById(id: number) {
    const admin = this.admins.find((admin) => admin.id === id);
    if (!admin) throw new NotFoundException(`Admin with id: ${id} not found`);
    return admin;
  }

  createAdmin(adminData: any) {
    if (!adminData) throw new BadRequestException('Datos invalidos');
    const newAdmin = {
      id: this.admins.length + 1,
      ...adminData,
    };
    this.admins.push(newAdmin);
    return `Usuario con el id: ${newAdmin.id} Agregado con exito`;
  }
}
