import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Token not found"})
    return;
  }

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as Secret);

    if (Date.now() >= decodedToken.exp * 1000) {
      res.status(401).json({ message: 'Token has expired' });
      return;
    }
    
    req.user = decodedToken;
    req.cookies = { token };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticateUser;
