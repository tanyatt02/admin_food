import { Main, Dialogs, CompaniesPage, CommonState, RawsPage, CommonTablesPage } from './store-core';

export interface RootState {
  main: Main;
  common: CommonState;
  companiesPage: CompaniesPage;
  dialogs: Dialogs;
  rawsPage: RawsPage;
  commonTables: CommonTablesPage;
}
