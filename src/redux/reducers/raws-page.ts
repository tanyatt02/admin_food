import { GET_RAWS_LIST, IMPORT_RAWS, ADD_RAW, UPDATE_RAW } from '../constants';
import { Action } from 'redux';
import { RawsPage, CompaniesPage } from '../../interfaces/store-core';
import clone from 'clone';

interface CustomAction extends Action {
  payload: any;
}

let initialState: RawsPage = {
  raws: [],
};

export default function rawsPageReducer(rawsPage = initialState, action: CustomAction) {
  switch (action.type) {
    case GET_RAWS_LIST:
      return Object.assign({}, rawsPage, { raws: action.payload || [] });
    case IMPORT_RAWS:
      return Object.assign({}, rawsPage, { raws: action.payload || [] });
    case ADD_RAW: {
      const { companyId, raw } = action.payload;
      const companies = clone(companiesPage.companies);
      const companyIndex = companies.findIndex(company => company._id === companyId);
      if (companyIndex !== -1) {
        const company = companies[companyIndex];
        company.raws.push(raw);
      }
      return Object.assign({}, rawsPage, { raws: action.payload || [] })
    }
    case UPDATE_RAW: {
      const updatedRaw = action.payload;
      const _id = updatedRaw._id;
      const raws = clone(rawsPage.raws);
      const rawIndex = raws.findIndex(raw => raw._id === _id);
      raws[rawIndex] = updatedRaw;
      return Object.assign({}, rawsPage, { raws });
      }  
      
      
      
    default:
      return rawsPage;
  }
}
