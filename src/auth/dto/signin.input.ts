import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class SignInInput {
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
}
