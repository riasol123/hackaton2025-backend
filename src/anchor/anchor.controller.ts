import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAnchorDTO } from './dto/create-anchor.dto';
import { UpdateAnchorDTO } from './dto/update-anchor.dto';
import { AnchorService } from './anchor.service';

@ApiTags('anchors')
@Controller('anchors')
export class AnchorController {
  constructor(private readonly anchorService: AnchorService) {}

  @Post()
  createAnchor(@Body() data: CreateAnchorDTO) {
    return this.anchorService.createAnchor(data);
  }

  @Patch(':id')
  updateAnchor(
    @Body() data: UpdateAnchorDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.anchorService.updateAnchor(id, data);
  }

  @Get()
  getAnchors() {
    return this.anchorService.getAnchors();
  }

  @Delete(':id')
  deleteAnchor(@Param('id', ParseIntPipe) id: number) {
    return this.anchorService.deleteAnchors(id);
  }
}
