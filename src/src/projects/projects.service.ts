import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: createProjectDto.user_id },
    });

    if (!userExists) {
      throw new NotFoundException(
        `User with ID ${createProjectDto.user_id} does not exist`,
      );
    }

    return await this.prisma.generalProject.create({
      data: {
        nama: createProjectDto.nama,
        deskripsi: createProjectDto.deskripsi,
        tanggal_mulai: new Date(createProjectDto.tanggal_mulai),
        tanggal_selesai: new Date(createProjectDto.tanggal_selesai),
        user_id: createProjectDto.user_id,
      },
    });
  }

  findAll() {
    return this.prisma.generalProject.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
