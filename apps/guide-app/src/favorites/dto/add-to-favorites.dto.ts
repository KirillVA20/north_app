import { IsMongoId } from 'class-validator';

export class AddToFavoritesDto {
  @IsMongoId()
  spotId!: string;
}
