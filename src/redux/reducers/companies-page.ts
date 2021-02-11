import {
  GET_COMPANIES,
  ADD_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../constants';
import clone from 'clone';
import { CompaniesPage } from '../../interfaces/store-core';
import { Action } from 'redux';

interface CustomAction extends Action {
  payload: any;
}

let initialState: CompaniesPage = {
  companies: [],
};

export default function pupilInfoReducer(companiesPage = initialState, action: CustomAction) {
  switch (action.type) {
    case GET_COMPANIES:
      return Object.assign({}, companiesPage, { companies: action.payload });
    case ADD_COMPANY:
      return Object.assign({}, companiesPage, { companies: [...companiesPage.companies, action.payload] });
    case UPDATE_COMPANY: {
      const updatedCompany = action.payload;
      const _id = updatedCompany._id;
      const companies = clone(companiesPage.companies);
      const companyIndex = companies.findIndex(company => company._id === _id);
      companies[companyIndex] = updatedCompany;
      return Object.assign({}, companiesPage, { companies });
      }
    case DELETE_COMPANY: {
      const _id = action.payload;
      const companies = clone(companiesPage.companies);
      const companyIndex = companies.findIndex(company => company._id === _id);
      companies.splice(companyIndex, 1);
      return Object.assign({}, companiesPage, { companies });
    }
    case ADD_USER: {
      const { companyId, user } = action.payload;
      const companies = clone(companiesPage.companies);
      const companyIndex = companies.findIndex(company => company._id === companyId);
      if (companyIndex !== -1) {
        const company = companies[companyIndex];
        company.users.push(user);
      }
      return Object.assign({}, companiesPage, { companies });
    }
    case UPDATE_USER: {
      const { _id } = action.payload;
      const companies = clone(companiesPage.companies);
      for (const company of companies) {
        const users = [...company.users];
        const userIndex = users.findIndex(user => user._id === _id);
        if (userIndex !== -1) {
          users[userIndex] = action.payload;
        }
        company.users = users;
      }
      return Object.assign({}, companiesPage, { companies });
    }
    case DELETE_USER: {
      const _id = action.payload;
      const companies = clone(companiesPage.companies);
      for (const company of companies) {
        const users = [...company.users];
        const userIndex = users.findIndex(user => user._id === _id);
        if (userIndex !== -1) {
          users.splice(userIndex, 1);
        }
        company.users = users;
      }
      return Object.assign({}, companiesPage, { companies });
    }
    default:
      return companiesPage;
  }
}
