import { SuccessResponse } from "./success-response";

export interface LoginResponse extends SuccessResponse {
  id: string;
  email: string;
  provider: string;
  firstName: string;
  lastName: string;
  expiresIn: number;
}
