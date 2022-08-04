import {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Header from "../shared/header";
import {Link} from "react-router-dom";

const ReadFile = () => {

  const [columns, setColumns] = useState([]);

  const [rowData, setRowData] = useState([]);

  useEffect( () => {
    document.title = 'ECD - Read Excel file';

    axios
      .get('http://localhost:8080/read-file')
      .then((response) => {
        setRowData(response.data.rows);
        getColumns(response.data.rows[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const getColumns = (data) => {
    setColumns(Object.keys(data).map((column) => {
      return {field: column, filter: true, editable: true}
    }));
  }

    const Table = () => {
      if (columns.length === 0) {
        return <></>
      } else {
        return (
                <div className="ag-theme-alpine" style={{
                  height: 400,
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'center'
                }}>
                  <AgGridReact
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
          <div className="container-fluid">
          <div className="row">
            <div className="col-10 mx-auto">
              <h1>Table</h1>
              <Table />
              <Link to="/meta-data" className="btn btn-outline-primary px-5 py-3 float-start mt-5">Back</Link>
            </div>
          </div>
        </div>
        </>
          )
  }

export default ReadFile
