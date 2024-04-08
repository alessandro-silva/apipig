/* eslint-disable @typescript-eslint/interface-name-prefix */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    producer: {
      id: string;
    };
    farm: {
      id: string;
    };
  }
}
