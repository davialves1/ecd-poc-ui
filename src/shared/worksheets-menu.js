import {Button} from "primereact/button";
import {useContext} from "react";
import DataContext from "./data-context";
import WorksheetsList from "./worksheets-list";
import {Link} from "react-router-dom";
import {confirmDialog, ConfirmDialog} from "primereact/confirmdialog";

const WorksheetsMenu = () => {

  const {metaData} = useContext(DataContext);

  const alert = () => {
    confirmDialog({
      message: 'This feature was not yet created',
      header: 'Feature not implemented',
      icon: 'pi pi-exclamation-triangle',
      closeOnEscape: true,
      focusOnShow: true
    })
  }

  return (
      <div className="col-2 bg-light vh-100">
        <p className="mt-5">
          <h5>Uploading</h5>
          Excel File: {metaData.frontend.get('file').name}
        </p>
        <Link to="/upload" className="">
          <Button className="p-button-outlined w-100" label="Cancel Import"/>
        </Link>
        <WorksheetsList />
        <div className="align-self-end mb-5">
          <h5>Actions</h5>
          <ConfirmDialog/>
          <Button className="w-100 mt-3" label="Map Columns" onClick={alert} />
          <Button className="w-100 mt-3" label="Data Validation" onClick={alert} />
          <Button className="w-100 mt-3" label="Upload" onClick={alert} />
        </div>
      </div>
  )
};

export default WorksheetsMenu;
