import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SensorGateway } from './sensor.gateway';
import { Anchor } from 'sequelize/models/anchor';
import { AnchorModule } from './anchor/anchor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: true,
      models: [Anchor],
    }),
    AnchorModule,
  ],
  providers: [SensorGateway],
})
export class AppModule {}
