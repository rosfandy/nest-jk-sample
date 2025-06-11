import {
  IsString,
  IsInt,
  IsDateString,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  nama: string;

  @IsString()
  deskripsi: string;

  @IsDateString()
  tanggal_mulai: string;

  @IsDateString()
  tanggal_selesai: string;

  @IsInt()
  user_id: number;

  @IsInt()
  divisi_id: number;
}
