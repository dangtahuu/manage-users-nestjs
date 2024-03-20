import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  dateOfBirth: Date;
}
