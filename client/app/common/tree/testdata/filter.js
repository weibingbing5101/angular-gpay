import _ from 'lodash'
let keyMapping = {
  'name': 'title',
  '_child': 'nodes'
};

function transformObj(currentObject) {
  let transformedObj = _.transform(currentObject, function(result, value, key) {
    if (_.isObject(value)) {
      value = transformObj(value);
    }
    if (key === 'name' || key === '_child') {
      result[keyMapping[key]] = value;
    }
    result[key] = value;
  });
  console.log(transformedObj)
  return transformedObj;
}

function deepMapKeys(allItems) {
  return _.map(allItems, function(currentObject) {
    return transformObj(currentObject);
  });
}

let menuDataProcess = function(souce) {
  let processedData;
  processedData = deepMapKeys(souce);
  console.log('processedData', processedData);
  return processedData;
};

let headerDataProcess = function(souce) {
    return souce;
};

export {
  menuDataProcess,
  headerDataProcess
};