import {useEffect, useState, useContext} from "react";
import {AgGridReact} from "ag-grid-react";
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Header from "../shared/header";
import {Link} from "react-router-dom";
import ProgressBar from "../shared/progress-bar";
import DataContext from "../shared/data-context";
import EntityMapper from "../shared/entity-mapper";
import WorksheetsMenu from "../shared/worksheets-menu";
import {Button} from "primereact/button";

const ReadFile = () => {

  const [columns, setColumns] = useState([]);

  const [rowData, setRowData] = useState([]);

  const {setProgress, progress} = useContext(DataContext);

  const CustomTooltip = (params) => {
    const column = params.colDef.field;
    if (params.data.errors[column]) {
      return (
      <p className="shadow" style={{width: 200, height: 100, borderRadius: 10, padding: 20, backgroundColor: 'white'}}>
        <span style={{fontWeight: 'bold', color: 'indianred'}}>Error:</span> {params.data.errors[column]}
      </p>)
    } else {
      return <p className="shadow"
                style={{display: 'flex',
                        justifyItems: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        textAlign: 'center',
                        width: 100,
                        height: 50,
                        borderRadius: 10,
                        padding: 20,
                        backgroundColor: 'white'}}>
        {params.data[column]}</p>
    };
  }

  const CustomHeaderComponent = (params) => {
    const column = params.columnGroup.children[0].colId;
    return (
        <>
          <EntityMapper column={column} inputCount={1} params={params}/>
        </>
      )

  }

  useEffect( () => {

    document.title = 'ECD - Read Excel file';

    setProgress(75);

    const getColumns = (data) => {
      const columnDef = Object.keys(data).map((column) => {
        return {
          headerGroupComponent: CustomHeaderComponent,
          suppressMenu: true,
          children: [
            {
              field: column,
              filter: true,
              sortable: true,
              hide: column === 'errors',
              editable: column !== 'id',
              onCellValueChanged: updateValue,
              tooltipValueGetter: (params) => params,
              tooltipComponent: CustomTooltip,
              cellClassRules: {
                'error': params => !!params.data.errors[column]
              }
            }
          ]
          }
      });
      setColumns(columnDef);
    }

    axios
      .get('http://localhost:8080/read-file')
      .then((response) => {
        setRowData(response.data.rows);
        getColumns(response.data.rows[0]);
      })
      .catch((err) => console.error(err));
  }, [setProgress]);

  const updateValue = (value) => {
    const dto = {
      id: value.data.id,
      column: value.colDef.field,
      newValue: value.newValue
    };
    axios.put('http://localhost:8080/update-value', dto)
      .then((response) => console.log('Value updated', response))
      .catch((err) => console.log(err));
  };

  const Table = () => {
      if (columns.length === 0) {
        return <></>
      } else {
        return (
                <div className="ag-theme-alpine" style={{
                  height: 600,
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'center'
                }}>
                  <AgGridReact
                      tooltipShowDelay={0}
                      rowData={rowData}
                      columnDefs={columns}>
                  </AgGridReact>
                </div>
        );
      }
    }
    return (
        <>
          <Header />
          <ProgressBar progressNumber={progress} />
          <div className="container-fluid">
          <div className="row vh-100">
            <WorksheetsMenu />
            <div className="col-9 mx-auto pt-5">
              <h1>Data</h1>
              <Table />
              <Link to="/meta-data" className="float-start mt-5">
                <Button label="Previous page"/>
              </Link>
            </div>
          </div>
        </div>
        </>
          )
  }

export default ReadFile
