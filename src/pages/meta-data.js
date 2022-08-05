import {useContext, useEffect} from "react";
import Header from "../shared/header";
import DataContext from "../shared/data-context";
import {Link} from "react-router-dom";
import ProgressBar from "../shared/progress-bar";

const MetaData = () => {

  const {setProgress, progress, metaData} = useContext(DataContext);

  useEffect(() => {
    document.title = 'ECD | Meta Data';

    setProgress(50);
  });

  const BackendInfo = () => {
    if (metaData.backend) {
      const author = metaData.backend.author ? metaData.backend.author : '-';
      return (
          <div className="text-start">
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
        <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-10 mx-auto text-center">
              <h1 className="text-start">Meta Data</h1>
            </div>
            <div className="col-10 mx-auto text-center p-5 bg-light mt-5 rounded">
              <BackendInfo/>
            </div>
            <div className="col-10 mx-auto text-center mt-5 rounded">
              <Link to="/upload" className="btn btn-outline-primary px-5 py-3 float-start">Back</Link>
              <Link to="/read-file" className="btn btn-outline-primary px-5 py-3 float-end">Read File</Link>
            </div>
          </div>
        </div>
      </>
  );
}

export default MetaData;
