import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateModelDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
}
