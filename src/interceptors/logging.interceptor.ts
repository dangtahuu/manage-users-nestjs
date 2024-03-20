import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);

    const { originalUrl, method, params, query, body } = ctx.getContext().req;

    console.log(`Request: `,{
      originalUrl,
      method,
      params,
      query,
      body,
    });
   
    return next.handle().pipe(
      tap((data) =>
        console.log(`Response: `,{
          data,
        })
      )
    );
  }
}


