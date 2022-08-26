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

  const {setProgress, progress} = useContext(DataContext);

  const {selectedWorksheet, setSelectedWorksheet} = useContext(DataContext);

  const {worksheets, setWorksheets} = useContext(DataContext);

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
              // 'error': params => !!params.data.errors[column]
              'error': params => false
            }
          }
        ]
      }
    });
    setColumns(columnDef);
  }, [CustomHeaderComponent]);


  const fetchFile = useCallback(() => {
    return axios.get('http://localhost:8080/read-file-dynamic')
    .then((response) => {
      const sheets = response.data.worksheets;
      const worksheetsKeys = Object.keys(sheets);
      setWorksheets(sheets);
      const firstWorksheet = sheets[worksheetsKeys[0]];
      setSelectedWorksheet(worksheetsKeys[0]);
      createColumns(firstWorksheet[0]);
      setRowData(firstWorksheet);

    })
  }, [createColumns, setWorksheets, setSelectedWorksheet]);

  useEffect(() => {
    if (selectedWorksheet) {
      setRowData(worksheets[selectedWorksheet]);
      createColumns(worksheets[selectedWorksheet][0]);
    }
  }, [selectedWorksheet, createColumns, worksheets])

  useEffect( () => {
    document.title = 'ECD - Read Excel file';
    setProgress(75);
    fetchFile().catch((err) => console.error(err));

  }, [setProgress, fetchFile]);

  const updateValue = (value) => {
    const dto = {
      id: +value.data.Id,
      column: value.colDef.field.toLowerCase(),
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
