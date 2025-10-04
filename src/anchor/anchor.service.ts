import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Anchor } from 'sequelize/models/anchor';
import { CreateAnchorDTO } from './dto/create-anchor.dto';
import { UpdateAnchorDTO } from './dto/update-anchor.dto';

@Injectable()
export class AnchorService {
  constructor(
    @InjectModel(Anchor) private readonly anchorRepository: typeof Anchor,
  ) {}

  createAnchor(data: CreateAnchorDTO): Promise<Anchor> {
    return this.anchorRepository.create(data as Anchor);
  }

  async updateAnchor(id: number, data: UpdateAnchorDTO): Promise<Anchor> {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('No data to update');
    }

    const [count, anchor] = await this.anchorRepository.update(data, {
      where: { id },
      returning: true,
    });

    if (count === 0) {
      throw new NotFoundException('Anchor was not found');
    }

    return anchor[0];
  }

  getAnchors(): Promise<Anchor[]> {
    return this.anchorRepository.findAll();
  }

  async deleteAnchors(id: number): Promise<void> {
    const deletedAnchorCount = await this.anchorRepository.destroy({
      where: { id },
    });

    if (deletedAnchorCount === 0) {
      throw new NotFoundException('Anchor was not found');
    }
  }
}
