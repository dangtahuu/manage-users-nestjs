import { ObjectType, Int, Field } from '@nestjs/graphql';
import { Auth } from 'src/auth/entities/auth.entity';

@ObjectType()
export class SignResponse {
  @Field()
  accessToken: string;

  @Field(() => Auth)
  user: Auth;
}
