import {
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PathPointDto)
  path?: PathPointDto[];
}

export class PathPointDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  coordinates!: [number, number];
}
