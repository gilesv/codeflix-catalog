import { CastMemberKind } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateCastMemberDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(CastMemberKind)
  type: CastMemberKind;
}
