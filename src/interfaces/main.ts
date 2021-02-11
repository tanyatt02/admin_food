export interface UserBase {
  _id?: string;
  name: string;
}

export interface User extends UserBase {
  companyId: string;
}

export interface RawBase {
  _id?: string;
  rawName: string;
  price: number
}

export interface Raw extends RawBase {
  companyId: string;
}

export interface Company {
  _id?: string;
  name: string;
  users: Array<User>;
}

export enum MessageType {
  success = 1,
  warning = 2,
  error = 3,
}

export interface EventMessage {
  type: MessageType;
  message: any;
  duration?: number;
}