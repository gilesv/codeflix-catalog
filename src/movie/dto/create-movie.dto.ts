import { IsBooleanString, IsDefined, IsNotEmpty, IsNumberString } from "class-validator";

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsDefined()
  synopsis: string;

  @IsNumberString()
  releaseYear: number;

  @IsBooleanString()
  isAvailable: boolean;
}
