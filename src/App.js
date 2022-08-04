import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function App() {

  useEffect(() => {
    document.title = 'ECD - Upload file POC'
  })

  const [formData, setFormData] = useState(new FormData());

  const [fileName, setFileName] = useState('');

  const [columns, setColumns] = useState([]);

  const [backendData, setBackendData] = useState(null);

  const [rowData, setRowData] = useState([
    {Model: 'Golf', Year: '2001', Price: '$25.000', Market: 'USA'},
    {Model: 'Passat', Year: '2001', Price: '$25.000', Market: 'USA'},
    {Model: 'Tourag', Year: '2001', Price: '$25.000', Market: 'USA'},
    {Model: 'ID4', Year: '2001', Price: '$25.000', Market: 'USA'},
    {Model: 'ID3', Year: '2001', Price: '$25.000', Market: 'USA'},
  ])

  const onChangeFile = (event) => {
    const file = event.target.files[0];
    updateFormData(file);
  }

  const sendToBackend = async (event) => {
    event.preventDefault();
    const sendFile = axios.post('http://localhost:8080/upload', formData);
    sendFile
      .then((response) => setBackendData(response.data))
      .catch((err) => console.error(err));
  }

  const updateFormData = (file) => {
    const newFormData = new FormData();
    newFormData.append('file', file);
    setFormData(newFormData);
    setBackendData(null);
    setFileName(file.name);
  }

  const onDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onDropFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    updateFormData(file);
  }

  const getColumns = async () => {
    setColumns(Object.keys(rowData[0]).map((column) => {
            return {field: column, filter: true, editable: true}
          }));
    // await axios.get("http://localhost:8080/read-file")
    //   .then((response) => {
    //     const columns = response.data.columns.map((column) => {
    //       return {field: column}
    //     })
    //     setColumns(columns);
    //   })
    // .catch((error) => console.error(error));
  }

  const Table = () => {
    if (columns.length === 0) {
      return <></>
    } else {
      return (
      <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
        <AgGridReact
            rowData={rowData}
            columnDefs={columns}>
        </AgGridReact>
      </div>
      );
    }
  }

  const AgGridTable = () => {
    return (
        <>
          <button onClick={getColumns}>update</button>
          <Table />
        </>
    )
  }

  const FileDropArea = () => {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div id="drop-file-zone"
             style={{
               marginTop: 20,
               width: '80%',
               height: 400,
               borderRadius: 10,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor: 'rgba(0, 0, 0, 0.1)'}}
             onDragOver={onDragOver}
             onDropCapture={onDropFile}>
          <form>
            <input id="file-selector" style={{margin: 40, display: "none"}} type="file" onChange={onChangeFile} />
            <label style={{backgroundColor: "white", borderRadius: 10, padding: "20px 40px", cursor: "pointer"}} htmlFor="file-selector">Drag or select a file</label>
            <p style={{padding: 20}}>{fileName}</p>
            <br/>
          </form>
        </div>
    </div>
    );
  }

  const buttonIsActive = () => !!formData.has('file');

  const BackendInfo = () => {
    if (backendData) {
      return (
          <div>
            <p style={{marginTop: 50}}>Data from Backend:</p>
            <p>Author: <strong>{backendData.author}</strong></p>
            <p>Creation Date: <strong>{backendData.creationDate}</strong></p>
            <p>Last Modified
              Date: <strong>{backendData.lastModifiedDate}</strong></p>
          </div>
      );
    } else {
      return <></>;
    }
  }

  const FileInfo = () => {
    if(formData.has('file')) {
      const lastModified = formData.get('file').lastModified;
      const date = new Date(lastModified).toDateString();
      return (
          <div>
            <h1>Meta Data Information:</h1>
            <p>Data from FrontEnd:</p>
            <p>File size: <strong>{formData ? formData.get('file').size / 100 + ' KB': '-'}</strong></p>
            <p>Last modified: <strong>{date}</strong></p>
            <BackendInfo />
          </div>
      )
    } else {
      return <p style={{color:"lightgray"}}>Select a file to see the file metadata</p>
    }
  }

  return (<AgGridTable />
    // <div className="App">
    //   <h1>POC - Select Excel File</h1>
    //   <FileDropArea />
    //   <button type="submit"
    //           disabled={!buttonIsActive()}
    //           style={{
    //             margin: 50,
    //             padding: '20px 60px',
    //             cursor: 'pointer',
    //             border: 'none',
    //             borderRadius: 10,
    //             backgroundColor: 'rgba(0, 0, 0, 0.1)'}}
    //           onClick={sendToBackend}>
    //     Send the file
    //   </button>
    //   <FileInfo/>
    //   <br />
    //   <h1>Table</h1>
    // </div>
  );
}

export default App;
