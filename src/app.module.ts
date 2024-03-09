import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/clinic'), AdminsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
