import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  return request?.user; // from passport-jwt
});
