import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import DataContext from "../shared/data-context";
import {useEffect, useState, useContext, useCallback} from "react";
import {Link} from "react-router-dom";
import Header from "../shared/header";
import ProgressBar from "../shared/progress-bar";
import WorksheetsMenu from "../shared/worksheets-menu";
import CustomTooltip from "../shared/custom-tooltip";
import Grid from "../shared/grid";
import CustomHeader from "../shared/custom-header";
import {Button} from "primereact/button";

const ReadFile = () => {

  const [columns, setColumns] = useState([]);

  const [rowData, setRowData] = useState([]);

  let height = 130;

  const {setProgress, progress, selectedWorksheet} = useContext(DataContext);

  const CustomHeaderComponent = useCallback((params) => (<CustomHeader params={params} height={height} />), [height]);

  const createColumns = useCallback((data) => {
    const columnDef = Object.keys(data).map((column) => {
      return {
        headerGroupComponent: CustomHeaderComponent,
        suppressMenu: true,
        autoHeaderHeight: true,
        resizable: true,
        children: [
          {
            field: column,
            filter: true,
            resizable: true,
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
  }, [CustomHeaderComponent]);


  const fetchFile = useCallback(() => {
    return axios.get('http://localhost:8080/read-file')
    .then((response) => {
      setRowData(response.data.rows);
      createColumns(response.data.rows[0]);
    })
  }, [createColumns]);


  useEffect( () => {
    document.title = 'ECD - Read Excel file';
    setProgress(75);
    fetchFile().catch((err) => console.error(err));
  }, [setProgress, fetchFile]);

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

    return (
        <>
          <Header />
          <ProgressBar progressNumber={progress} />
          <div className="container-fluid">
            <div className="row vh-100">
              <WorksheetsMenu />
              <div className="col-12 col-md-8 col-lg-10 mx-auto p-2 pt-5 p-lg-5">
                <h1>Worksheet: <span className="fw-lighter">{selectedWorksheet}</span></h1>
                <Grid columns={columns} height={height} rowData={rowData} />
                <Link to="/meta-data" className="float-start mt-5">
                  <Button className="p-button-outlined" label="Previous page"/>
                </Link>
              </div>
            </div>
          </div>
        </>
    )
  }

export default ReadFile
