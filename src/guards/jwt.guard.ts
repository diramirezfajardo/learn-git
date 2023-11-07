import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';

const validateRequest = async (
  request?: Record<string, Record<string, string>>,
): Promise<boolean> => {
  try {
    const authorization: string =
      request?.headers?.authorization?.split(' ')[1] || '';

    if (!authorization) return false;

    const response = await axios.get(
      `${process?.env?.ENDPOINT_USERS as string}/check`,
      {
        headers: { authorization: `Bearer ${authorization}` },
      },
    );

    return !!response;
  } catch (e: unknown) {
    return false;
  }
};

@Injectable()
export class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Record<string, Record<string, string>> = context
      .switchToHttp()
      .getRequest();
    const validation: boolean = await validateRequest(request);

    if (!validation) throw new UnauthorizedException();

    return validation;
  }
}
