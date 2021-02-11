import { CreateUser, DeleteUser, CreateCompany, DeleteCompany, CreateRaw } from './dialogs';
import { Company, EventMessage, UserBase, RawBase } from './main';
import { RawItem } from './raws-page';
import { CommonTable } from './shared/api';
import { AnimalNutrient, Nutrient } from './shared/model-interfaces';

export type DialogType = 'addCompany' | 'deleteCompany' | 'addUser' | 'deleteUser' | 'addRaw';

export interface Dialogs {
  addCompany: CreateCompany;
  deleteCompany: DeleteCompany;
  addUser: CreateUser;
  deleteUser: DeleteUser;
  addRaw: CreateRaw;
}

export interface CompaniesPage {
  companies: Company[];
}

export interface Main {
  drawerOpen: boolean;
  messages: EventMessage[];
  user: UserBase | null;
}

export interface CommonState {
  currentCompany: string;
}

export interface RawsPage {
  raws: RawItem[];
}

export interface CommonTablesPage {
  commonTables: CommonTable[];
  currentTable: number;
  currentTableItems: Array<AnimalNutrient | Nutrient>;
}
