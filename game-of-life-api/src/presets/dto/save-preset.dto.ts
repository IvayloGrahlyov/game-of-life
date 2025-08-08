import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SavePresetDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  name: string;

  @IsArray()
  grid: boolean[][];
}
