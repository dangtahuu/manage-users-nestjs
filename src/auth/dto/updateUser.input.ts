import { InputType, Field} from '@nestjs/graphql';
import { IsString, IsOptional, IsDate, MaxLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  @MaxLength(128)
  description: string;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  dateOfBirth: Date;

}
