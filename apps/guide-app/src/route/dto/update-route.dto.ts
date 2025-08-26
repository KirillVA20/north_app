import {
  IsString,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class PathDto {
  @IsNotEmpty()
  readonly type: 'LineString';

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => Array<number>)
  readonly coordinates: [number, number][]; // [lng, lat][]
}

export class UpdateRouteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PathDto)
  readonly path: PathDto;

  //   @IsArray()
  //   @ArrayMinSize(2)
  //   @IsString({ each: true })
  //   readonly spots: string[]; // Spot IDs
}
