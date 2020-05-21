import get from 'lodash/get';
import keys from 'lodash/keys';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import concat from 'lodash/concat';
import uniq from 'lodash/uniq';
import startCase from 'lodash/startCase';
import isEmpty from 'lodash/isEmpty';

export const buildEndpointTableData = (endpoint) => {
  let tableRows = [];

  if (!isEmpty(endpoint)){
    const method = get(endpoint, 'method', '');
    const endpointPath = get(endpoint, 'endpoint', '');
    const description = get(endpoint, 'description', '');

    tableRows.push(["Method", "Endpoint", "Description"]);
    tableRows.push([method, endpointPath, description]);
  }

  return tableRows;
};

export const buildEntityAttributesTable = (attributes) => {
  let tableRows = [];
  if (!isEmpty(attributes)){
    let headers = ["Key"];

    let extraKeys = values(attributes).map(attr => keys(attr));
    extraKeys = flatten(extraKeys);
    extraKeys = uniq(extraKeys);

    headers = concat(headers, extraKeys);
    tableRows.push(headers);

    keys(attributes).forEach(key => {
      let row = [key];
      let data = attributes[key];
      extraKeys.forEach(extraKey => row.push(data[extraKey]));

      tableRows.push(row);
    });
  }

  return tableRows;
};
