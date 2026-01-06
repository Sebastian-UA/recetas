import { Request } from 'express';
import { JwtUser } from './jwt-payload.interface';

export interface JwtRequest extends Request {
  user: JwtUser;
}
