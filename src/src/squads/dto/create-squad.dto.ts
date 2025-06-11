import { IsInt, IsOptional, IsString, IsJSON } from 'class-validator';

export class CreateSquadDto {
  @IsString()
  Name: string;

  @IsInt()
  general_project_id: number;

  @IsOptional()
  @IsJSON()
  anggota?: any;
}
