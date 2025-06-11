import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SquadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSquadDto: CreateSquadDto) {
    const projectId = createSquadDto.general_project_id;
    const project = await this.prisma.generalProject.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException(
        `Project with ID ${projectId} does not exist`,
      );
    }

    return await this.prisma.squad.create({
      data: {
        Name: createSquadDto.Name,
        general_project_id: createSquadDto.general_project_id,
        anggota: createSquadDto.anggota ?? undefined,
      },
    });
  }

  async findAll() {
    const squads = await this.prisma.squad.findMany({
      include: {
        projects: true,
      },
    });

    const enrichedSquads = await Promise.all(
      squads.map(async (squad) => {
        const anggota = squad.anggota as number[];

        const team = Array.isArray(anggota)
          ? await this.prisma.user.findMany({
              where: {
                id: { in: anggota },
              },
            })
          : [];

        return {
          ...squad,
          team,
        };
      }),
    );

    return enrichedSquads;
  }

  async findOne(id: number) {
    const squad = await this.prisma.squad.findUnique({
      where: { id },
      include: {
        projects: true,
      },
    });

    if (!squad) {
      throw new Error(`Squad with ID ${id} not found`);
    }

    const anggota = squad.anggota as number[];
    const team = Array.isArray(anggota)
      ? await this.prisma.user.findMany({
          where: {
            id: { in: anggota },
          },
        })
      : [];

    return {
      ...squad,
      team,
    };
  }

  update(id: number, updateSquadDto: UpdateSquadDto) {
    return `This action updates a #${id} squad`;
  }

  remove(id: number) {
    return `This action removes a #${id} squad`;
  }
}
