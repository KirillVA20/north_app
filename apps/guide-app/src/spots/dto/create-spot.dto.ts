import { IsLatitude, IsLongitude, IsOptional, IsString } from 'class-validator';

export class CreateSpotDto {
  @IsString()
  name!: string;

  @IsLatitude()
  lat!: number;

  @IsLongitude()
  lng!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  previewImageUrl?: string;

  @IsOptional()
  @IsString()
  userId!: string; // ID пользователя, владельца spot
}
