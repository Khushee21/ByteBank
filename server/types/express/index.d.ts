import { UserDocument } from '../../models/User'; // or `any` if you're unsure

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument; // or just `any` if you're not using types
    }
  }
}
