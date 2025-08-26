// create-spot.dto.ts
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class UpdateSpotDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  lng?: number;

  @IsNumber()
  @IsOptional()
  lat?: number;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsString()
  previewImageUrl?: string;
}
