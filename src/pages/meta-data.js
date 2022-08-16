import {useContext, useEffect} from "react";
import Header from "../shared/header";
import DataContext from "../shared/data-context";
import {Link} from "react-router-dom";
import ProgressBar from "../shared/progress-bar";
import {Button} from "primereact/button";

const MetaData = () => {

  const {file, setProgress, progress, metaData} = useContext(DataContext);

  useEffect(() => {
    document.title = 'ECD | Meta Data';

    if (file) {
      setProgress(50);
    } else {
      setProgress(1);
    }
  });

  const BackendInfo = () => {
    if (metaData && metaData.backend) {
      const author = metaData.backend.author ? metaData.backend.author : '-';
      return (
          <div className="text-start">
            <p>File Name: <strong>{metaData.frontend.get('file').name}</strong></p>
            <p>Author: <strong>{author}</strong></p>
            <p>Creation Date: <strong>{metaData.backend.creationDate}</strong></p>
            <p>Last Modified Date: <strong>{metaData.backend.lastModifiedDate}</strong></p>
            <p>File Size: <strong>{metaData.frontend.get('file').size / 100 + ' KB'}</strong></p>
          </div>
      );
    } else {
      return <>You need to <Link to="/upload" >upload a file</Link></>;
    }
  }

  return (
      <>
        <Header />
        <ProgressBar progressNumber={progress} />
        <div className="container-fluid my-5">
          <div className="row">
            <div className="col-10 mx-auto text-center">
              <h1 className="text-start">Meta Data</h1>
            </div>
            <div className="col-10 mx-auto text-center p-5 bg-light mt-5 rounded">
              <div className="text-center mx-auto" style={{width: 'fit-content'}}>
                <BackendInfo/>
              </div>
            </div>
            <div className="col-10 mx-auto text-center mt-5 rounded">
              <Link to="/upload" className="float-start">
                <Button className="p-button-outlined" label="Previous page"/>
              </Link>
              <Link to="/read-file" className="float-end">
                <Button label="Read File"/>
              </Link>
            </div>
          </div>
        </div>
      </>
  );
}

export default MetaData;
