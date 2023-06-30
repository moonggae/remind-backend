import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CtxUser = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): ContextUser => {
      const req = ctx.switchToHttp().getRequest(); // 1
      return req.user; // 2
    }
  );