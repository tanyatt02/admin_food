import { CommonTable } from './shared/api';
import { AnimalNutrient, Nutrient } from './shared/model-interfaces';
import { EventMessage, UserBase } from './main';
import { DialogType } from './store-core';
import { Dialog, CreateCompany, DeleteCompany, CreateUser, DeleteUser, CreateRaw } from './dialogs';

export interface Payload {
  value: any;
}

export interface CommonTablesPagePayload extends Payload {
  commonTables: CommonTable;
  tableItems: Array<AnimalNutrient | Nutrient>;
  tableIndex: number;
}

export interface MainPagePayload extends Payload {
  message: EventMessage;
  user: UserBase;
}

export interface DialogsPayload extends Payload {
  dialog: DialogType;
  state: Dialog | CreateCompany | DeleteCompany | CreateUser | DeleteUser | CreateRaw;
}
