import React from "react";
import Select from 'react-select';
import { migrateDataService,loadColumnNamesData,loadTableNameData,loadDataBaseService} from '../services/http';
import { debuglog } from "util";

export default class RandomAPIData extends React.Component {

  tableSelect = {};
  destinationDBSelect = {};
    constructor(props) {
        super(props);
        this.state = {
            responseObjArray: [],
            tableColumnNames: [],
            messsage : "",
            columnsSelect : [],
            dataBasesArray: [],
            sourceDBSelect : null,
            destinationDBSelect : null,
        }
        this.loadTables = this.loadTables.bind(this);
        this.handleTableNameChange = this.handleTableNameChange.bind(this);
    }


    componentDidMount() {
      loadDataBaseService((res) => {
        try{
          this.setState({
            dataBasesArray:res,
            error: false
          })
        }catch(e){
        debugger
        }
      })
  }

  removeFromSourceDB = sourceDBSelect =>{
    this.setState({
        sourceDBSelect : sourceDBSelect,
    })
  }
  removeFromDestinationDB = destinationDBSelect =>{
    this.setState({
        destinationDBSelect : destinationDBSelect,
    })
  }


  loadTables() {
    debugger
    let inputData = { "sourceDB":this.state.sourceDBSelect.value, "destinationDB":this.state.destinationDBSelect.value};
        loadTableNameData(inputData,(res) => {
          try{
            this.setState({
              responseObjArray:res,
              error: false
            })
          }catch(e){
          debugger
          }
        })    
    }
 

    handleTableNameChange = tableSelect => {
      this.tableSelect = tableSelect;
      debugger
      let inputData = { "tableName":this.tableSelect.value};
      loadColumnNamesData(inputData, (response) => {
        debugger
        this.setState({
          tableColumnNames: response,
          error: false
        })
      });
    }

    migrateData(){

      let inputData = {};
      let columnsList = {};
      for(let i=0 ; i< this.state.tableColumnNames.length;i += 1){
        columnsList +=  this.state.tableColumnNames[i].key+":"+this.state.tableColumnNames[i].value+","
      }
      inputData= {
           "tableName":this.tableSelect.value,
            "sorcedb":{
              columnsList
            }
        }
        migrateDataService(inputData, (response) => {
          this.setState({
            messsage: response.data,
            flag: true,
            loading: false,
            error: false,
            data: this.data,
          })
        });
         }


render() {

  let buildOptions = {};
  let tableOptions = [];
  try{
  this.state.responseObjArray.map((responseObj) => {
    buildOptions = {};
    buildOptions['value']= responseObj;
    buildOptions['label']=responseObj;
    tableOptions.push(buildOptions);
  }
  );

}catch(ex) {
  debugger;
}

let buildColumnsOptions = {};
let columnsOptions = [];
try{
this.state.tableColumnNames.map((responseObj) => {
  buildColumnsOptions = {};
  buildColumnsOptions['value']= responseObj["data_type"];
  buildColumnsOptions['label']=responseObj["column_name"];
  columnsOptions.push(buildColumnsOptions);
}
);

}catch(ex) {
debugger;
}


const sourceDBSelected = this.state.sourceDBSelect;
const destinationDBSelected = this.state.destinationDBSelect;
let buildSourceDBOptions = {};
let dbSourceOptions = []; 

let buildDestinationDBOptions = {};
let dbDestinationOptions = []; 
try{
  this.state.dataBasesArray.map((responseObj) => {
    debugger
    buildSourceDBOptions = {};
    buildDestinationDBOptions = {};
    if (sourceDBSelected != null && sourceDBSelected.value !==  responseObj) {
      buildDestinationDBOptions['value']= responseObj;
      buildDestinationDBOptions['label']= responseObj;
      dbDestinationOptions.push(buildDestinationDBOptions);
    }else if (sourceDBSelected == null) {
      buildDestinationDBOptions['value']= responseObj;
      buildDestinationDBOptions['label']= responseObj;
      dbDestinationOptions.push(buildDestinationDBOptions);
    }
  });
  }catch(ex) {
  debugger;
  }

  try{
  this.state.dataBasesArray.map((responseObj) => {
    debugger
    buildSourceDBOptions = {};
    buildDestinationDBOptions = {};
    if (destinationDBSelected != null && destinationDBSelected.value !== responseObj ) {
      buildSourceDBOptions['value']= responseObj;
      buildSourceDBOptions['label']= responseObj;
      dbSourceOptions.push(buildSourceDBOptions);
   }else if (destinationDBSelected == null){
     buildSourceDBOptions['value']= responseObj;
     buildSourceDBOptions['label']= responseObj;
     dbSourceOptions.push(buildSourceDBOptions);
  }
  });
  }catch(ex) {
    debugger;
  }

let htmlCode =<div className="migrationContainer">

<div className={this.state.messsage!="" ? "showMessage" : "hideMessage"}>
            {this.state.messsage}
</div>

<label>Source DataBase:</label>
<Select
    value={this.state.sourceDBSelect}
    onChange={this.removeFromSourceDB}
    options={dbSourceOptions}
  />

<label>Destination DataBase:</label>
<Select
    value={this.state.destinationDBSelect}
    onChange={this.removeFromDestinationDB}
    options={dbDestinationOptions}
  />

<button id="loadTables" className="loadTable-icon" onClick={this.loadTables}>Load DataBase Tables</button>
<br/><br/>

<label>Select Table Name:</label>
  <Select
    value={this.tableSelect}
    onChange={this.handleTableNameChange}
    options={tableOptions}
  />

<label>Select Column Names:</label>
<Select
    multi={true}
    value={this.columnsSelect}
    options={columnsOptions}
  />

<button id="migrateButton" className="migrate-icon" onClick={this.migrateData}>Migrate</button>

</div>

return (
    <div className="migration">
      {
        htmlCode
      }
    </div>
  );
}
}