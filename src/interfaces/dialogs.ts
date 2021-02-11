import { Company, User, Raw } from './main';

export interface Dialog {
  open: boolean;
}

export interface CreateCompany extends Dialog {
  company?: Company;
}

export interface DeleteCompany extends Dialog {
  company?: Company;
}

export interface CreateUser extends Dialog {
  company?: Company;
  user?: User;
}

export interface DeleteUser extends Dialog {
  user?: User;
}

export interface CreateRaw extends Dialog {
  company?: Company;
  raw?: Raw;
}
