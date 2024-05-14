import { Request } from 'express';
import { User } from '../user/entities/user.entity'; // Ajuste o caminho conforme necessário

export interface RequestWithUser extends Request {
  user: {
    id: number;
    username: string;
    role: string
  };
}
