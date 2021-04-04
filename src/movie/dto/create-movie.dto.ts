import { IsArray, IsBoolean, IsDefined, IsNotEmpty, IsNumber } from "class-validator";

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsDefined()
  synopsis: string;

  @IsNumber()
  releaseYear: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsArray()
  categories: string[];

  @IsArray()
  genres: string[];
}
