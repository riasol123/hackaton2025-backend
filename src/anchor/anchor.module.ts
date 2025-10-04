import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnchorController } from './anchor.controller';
import { Anchor } from 'sequelize/models/anchor';
import { AnchorService } from './anchor.service';

@Module({
  controllers: [AnchorController],
  providers: [AnchorService],
  imports: [SequelizeModule.forFeature([Anchor])],
})
export class AnchorModule {}
