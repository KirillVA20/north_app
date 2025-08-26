import {
  IsString,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class PointDto {
  @IsArray()
  @ArrayMinSize(2)
  readonly coordinates: [number, number]; // [lng, lat]

  @IsString()
  @IsOptional()
  readonly photo: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description?: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => PointDto)
  readonly points: PointDto[];
}
