import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup.input';
import { SignResponse } from './dto/sign.response';
import { SignInInput } from './dto/signin.input';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/currentUser.decorator';

import { UserResponse } from './dto/user.response';
import { UpdateUserInput } from './dto/updateUser.input';
import { GraphQLUpload } from 'graphql-upload';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Public()
  @Mutation(() => UserResponse)
  signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signup(signUpInput);
  }

  @Public()
  @Mutation(() => SignResponse)
  signin(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signin(signInInput);
  }

  @Query(() => UserResponse)
  viewInfo(@Args('id') id: number) {
    return this.authService.viewInfo(id);
  }

  @Mutation(() => UserResponse)
  updateUser(
    @CurrentUser('userId') userId: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args({ name: 'avatar', type: () => GraphQLUpload, nullable: true })
    avatar: any,
  ) {
    return this.authService.update(userId, updateUserInput, avatar);
  }
}
