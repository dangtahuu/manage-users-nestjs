import { ObjectType, Field } from '@nestjs/graphql';
import { Auth } from 'src/auth/entities/auth.entity';

@ObjectType()
export class UserResponse {
  @Field(() => Auth)
  user: Auth;
}
