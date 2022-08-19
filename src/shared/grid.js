import {AgGridReact} from "ag-grid-react";

const Grid = ({columns, rowData, height}) => {
  if (columns.length === 0) {
    return <></>
  } else {
    return (
        <div className="ag-theme-alpine mt-4" style={{
          height: 900,
          width: '100%',
          alignContent: 'center',
          alignItems: 'center'
        }}>
          <AgGridReact
              tooltipShowDelay={0}
              rowData={rowData}
              onGridReady={(params) => params.api.setGroupHeaderHeight(height)}
              columnDefs={columns}>
          </AgGridReact>
        </div>
    );
  }
};

export default Grid;
