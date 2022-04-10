import { Injectable, NestMiddleware } from '@nestjs/common';
import { addSalt, excript } from 'src/utils/encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const {password} = req.body['password'];
    if (password) {
      const salt = addSalt();
      const userPassword = excript(password, salt);
      req.body['password'] = userPassword;
      req.body['salt'] = salt;
    }
    
    next();
  }
}
