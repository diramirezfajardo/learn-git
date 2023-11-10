import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  readonly brand?: string;

  @IsString()
  @IsNotEmpty()
  readonly model?: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly logo?: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly image?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly year?: number;
}

export class CarUserDto {
  @IsNumber()
  @IsNotEmpty()
  readonly carId?: number;

  @IsNumber()
  @IsNotEmpty()
  readonly userId?: number;
}
