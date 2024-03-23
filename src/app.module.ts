import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/clinic-api'),
    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
