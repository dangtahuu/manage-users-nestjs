import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithAccessToken } from '../types/jwtPayload';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithAccessToken | undefined,
    context: ExecutionContext,
  ) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (data) return req.user[data];
    return req.user;
  },
);
