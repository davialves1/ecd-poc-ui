import Header from "../shared/header";
import {useState, useEffect, useContext, useCallback} from "react";
import axios from "axios";
import DataContext from "../shared/data-context";
import {useNavigate} from "react-router-dom";
import ProgressBar from "../shared/progress-bar";
import {Button} from "primereact/button";

const UploadFile = () => {
  const {progress, setProgress, file, setFile, setMetaData} = useContext(DataContext);

  const [formData, setFormData] = useState(new FormData());

  const [fileName, setFileName] = useState('');

  const updateFormData = useCallback((file) => {
    const newFormData = new FormData();
    newFormData.append('file', file);
    setFormData(newFormData);
    setMetaData(null);
    setFileName(file.name);
    setProgress(12.5);
  }, [setMetaData, setProgress]);

  const updateFile = useCallback(() => {
    if (file) {
      updateFormData(file);
    }
  }, [file, updateFormData])

  useEffect(() => {
    document.title = 'ECD | Select a file';
    updateFile();
  }, [file, updateFile] );

  const navigate = useNavigate();

  const buttonIsActive = () => !!formData.has('file');

  const onDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onDropFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);
    updateFormData(file);
  }

  const onChangeFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
    updateFormData(file);
  };

  const sendFileToBackend = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:8080/upload', formData)
    .then((response) => setMetaData({backend: response.data, frontend: formData}))
    .catch((err) => console.error(err));

    navigate("/meta-data");
  };

  const FileDropArea = () => {
    return (
        <div>
          <div id="drop-file-zone"
               className="bg-light row"
               style={{
                 marginTop: 20,
                 width: '100%',
                 height: 400,
                 borderRadius: 10,}}
               onDragOver={onDragOver}
               onDropCapture={onDropFile}>
            <span className="col-12 d-flex align-items-end justify-content-center pb-2">{fileName}</span>
            <form className="col-12 d-flex align-items-start justify-content-center pt-2">
              <input id="file-selector"
                     style={{display: "none"}}
                     type="file"
                     onChange={onChangeFile} />
              <label htmlFor="file-selector">
                <div className="p-button p-button-outlined">Drag or select a file</div>
              </label>
              <br/>
            </form>
          </div>
        </div>
    );
  }

  return (
      <>
        <Header />
        <ProgressBar progressNumber={progress} />
        <div className="container-fluid my-5">
          <div className="row">
            <div className="col-10 mx-auto text-center">
              <h1 className="text-start">Select a file</h1>
              <FileDropArea />
              <Button className="float-end mt-5"
                      type="submit"
                      label="Read Meta Data"
                      disabled={!buttonIsActive()}
                      onClick={sendFileToBackend} />
            </div>
          </div>
        </div>
      </>
  );
}

export default UploadFile;
