"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructQuery = exports.constructSearch = exports.constructFilter = void 0;
const castValue_1 = require("./castValue");
const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
const constructFilter = (filterString) => {
    try {
        let filterObject = {};
        if (!filterString)
            return {};
        const filterExpressions = filterString === null || filterString === void 0 ? void 0 : filterString.split('|');
        filterExpressions.forEach((expression) => {
            console.log('expression', expression);
            let valueArr;
            const expressionArr = expression.split(':');
            const key = expressionArr[0];
            const operator = expressionArr[1];
            const value = expressionArr[2];
            switch (operator) {
                case 'eq':
                    filterObject[key] = (0, castValue_1.castValue)(value);
                    break;
                case 'gt':
                    filterObject[key] = { $gt: (0, castValue_1.castValue)(value) };
                    break;
                case 'gte':
                    filterObject[key] = { $gte: (0, castValue_1.castValue)(value) };
                    break;
                case 'lte':
                    filterObject[key] = { $lte: (0, castValue_1.castValue)(value) };
                    break;
                case 'lt':
                    filterObject[key] = { $lt: (0, castValue_1.castValue)(value) };
                    break;
                case 'between':
                    valueArr = value === null || value === void 0 ? void 0 : value.split(',');
                    const start = (0, castValue_1.castValue)(valueArr[0]);
                    const end = (0, castValue_1.castValue)(valueArr[1]);
                    filterObject['$and'] = { [key]: { $gte: start, $lte: end } };
                    break;
                case 'ne':
                    filterObject[key] = { $ne: (0, castValue_1.castValue)(value) };
                    break;
                case 'in':
                    valueArr = value === null || value === void 0 ? void 0 : value.split(',');
                    filterObject[key] = { $in: valueArr };
                    break;
                case 'nin':
                    valueArr = value === null || value === void 0 ? void 0 : value.split(',');
                    filterObject[key] = { $nin: valueArr };
                    break;
                default:
                    throw new Error(`invalid filter operator ${operator}`);
            }
        });
        return filterObject;
    }
    catch (error) {
        console.error('constructFilter error', error, JSON.stringify(error), error === null || error === void 0 ? void 0 : error.message);
        throw error;
    }
};
exports.constructFilter = constructFilter;
const constructSearch = (search, searchFields) => {
    try {
        let searchObject = { $or: [] };
        if (!search || !searchFields || !(searchFields === null || searchFields === void 0 ? void 0 : searchFields.length))
            return {};
        searchFields.forEach((searchField) => {
            const regex = new RegExp(`^${search}`, 'i');
            searchObject.$or.push({ [searchField]: regex });
        });
        console.log('searchObject', searchObject);
        return searchObject;
    }
    catch (error) {
        console.error('constructSearch error', error, JSON.stringify(error), error === null || error === void 0 ? void 0 : error.message);
    }
};
exports.constructSearch = constructSearch;
const constructQuery = (req, searchFields) => {
    var _a, _b;
    const filterString = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.filter;
    const searchString = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.search;
    const filter = constructFilter(filterString);
    const search = constructSearch(searchString, searchFields);
    const query = Object.assign(Object.assign({}, filter), search);
    console.log('constructQuery response', filterString, searchString, query);
    return query;
};
exports.constructQuery = constructQuery;
