function migrationUrl(action, key, value) {
  return  'http://localhost:8080/datamigration/';
}

function httpCore() {
    return fetch;
}


function onError(e) {
    debugger
}


function onResponse(response) {
    return response.json()
}

function post(url, body,cb) {
    let headers = {
        "content-type": "application/json"
    };
    
    console.log("-------------"+JSON.stringify(body));
    return fetch(url, {
        method: 'post',
        headers,
        body: JSON.stringify(body)
      })
      .then(onResponse)
      .then(cb)
      .catch(onError);
}


function get(url,cb) {
    let headers = {
        "content-type": "application/json"
    };
    
    return fetch(url, {
        method: 'get',
        headers,
      })
      .then(onResponse)
      .then(cb)
      .catch(onError);
}


function  loadTableNameData(input,cb) {
    debugger;
    let getURL = migrationUrl()+"loadTables";
    return post(getURL,input,cb)
}


function  loadColumnNamesData(input,cb) {
    let getURL = migrationUrl()+"loadColumnNames";
    return post(getURL,input,cb)
}

function  migrateDataService(input,cb) {
    let getURL = migrationUrl()+"migrateData";
    return post(getURL,input,cb)
}

function  loadDataBaseService(cb) {
    let getURL = migrationUrl()+"loadDataBases";
    return get(getURL,cb)
}


export {migrateDataService,loadColumnNamesData,loadTableNameData,loadDataBaseService}