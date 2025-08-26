import { IsMongoId } from 'class-validator';

export class RemoveFromFavoritesDto {
  @IsMongoId()
  spotId!: string;
}
