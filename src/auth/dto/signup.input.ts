import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Field()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Field()
  confirmPassword: string;
}
