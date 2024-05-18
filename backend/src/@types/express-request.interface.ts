import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    fullName: string;
    role: string
  };
}
