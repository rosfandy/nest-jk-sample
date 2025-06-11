import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SquadsService } from './squads.service';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('squads')
export class SquadsController {
  constructor(private readonly squadsService: SquadsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSquadDto: CreateSquadDto) {
    return this.squadsService.create(createSquadDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.squadsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.squadsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSquadDto: UpdateSquadDto) {
    return this.squadsService.update(+id, updateSquadDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.squadsService.remove(+id);
  }
}
