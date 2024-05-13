import { AxiosResponse } from "axios";

export interface SuccessResponse extends AxiosResponse {
  success: boolean;
}
