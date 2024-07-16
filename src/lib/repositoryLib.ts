import { Request } from 'express';
import { castValue } from './castValue';

const escapeRegExp = (string: any) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const constructFilter: any = (filterString: string) => {
  try {
    let filterObject: any = {};
    if (!filterString) return {};
    const filterExpressions = filterString?.split('|');
    filterExpressions.forEach((expression: string) => {
      console.log('expression', expression);
      let valueArr;
      const expressionArr = expression.split(':');
      const key = expressionArr[0];
      const operator = expressionArr[1];
      const value = expressionArr[2];
      switch (operator) {
        case 'eq':
          filterObject[key] = castValue(value);
          break;
        case 'gt':
          filterObject[key] = { $gt: castValue(value) };
          break;
        case 'gte':
          filterObject[key] = { $gte: castValue(value) };
          break;
        case 'lte':
          filterObject[key] = { $lte: castValue(value) };
          break;
        case 'lt':
          filterObject[key] = { $lt: castValue(value) };
          break;
        case 'between':
          valueArr = value?.split(',');
          const start = castValue(valueArr[0]);
          const end = castValue(valueArr[1]);
          filterObject['$and'] = { [key]: { $gte: start, $lte: end } };
          break;
        case 'ne':
          filterObject[key] = { $ne: castValue(value) };
          break;
        case 'in':
          valueArr = value?.split(',');
          filterObject[key] = { $in: valueArr };
          break;
        case 'nin':
          valueArr = value?.split(',');
          filterObject[key] = { $nin: valueArr };
          break;
        default:
          throw new Error(`invalid filter operator ${operator}`);
      }
    });
    return filterObject;
  } catch (error: any) {
    console.error(
      'constructFilter error',
      error,
      JSON.stringify(error),
      error?.message
    );
    throw error;
  }
};

const constructSearch: any = (search: any, searchFields?: any[]) => {
  try {
    let searchObject: any = { $or: [] };
    if (!search || !searchFields || !searchFields?.length) return {};
    searchFields.forEach((searchField: string) => {
      const regex = new RegExp(`^${search}`, 'i');
      searchObject.$or.push({ [searchField]: regex });
    });
    console.log('searchObject', searchObject);
    return searchObject;
  } catch (error: any) {
    console.error(
      'constructSearch error',
      error,
      JSON.stringify(error),
      error?.message
    );
  }
};

const constructQuery: any = (req: Request, searchFields?: string[]) => {
  const filterString = req?.query?.filter;
  const searchString = req?.query?.search;
  const filter = constructFilter(filterString);
  const search = constructSearch(searchString, searchFields);
  const query = { ...filter, ...search };
  console.log('constructQuery response', filterString, searchString, query);
  return query;
};

export { constructFilter, constructSearch, constructQuery };
