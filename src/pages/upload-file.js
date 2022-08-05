import Header from "../shared/header";
import {useState, useEffect, useContext, useCallback} from "react";
import axios from "axios";
import DataContext from "../shared/data-context";
import {useNavigate} from "react-router-dom";
import ProgressBar from "../shared/progress-bar";

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
            <span className="col-12 d-flex align-items-center justify-content-center">{fileName}</span>
            <form className="col-12 d-flex align-items-start justify-content-center">
              <input id="file-selector"
                     style={{display: "none"}}
                     type="file"
                     onChange={onChangeFile} />
              <label className="btn btn-primary px-5 py-3" htmlFor="file-selector">
                Drag or select a file
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
        <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-10 mx-auto text-center">
              <h1 className="text-start">Select a file</h1>
              <FileDropArea />
              <button type="submit"
                      className="float-end mt-5 btn btn-outline-primary px-5 py-3"
                      disabled={!buttonIsActive()}
                      onClick={sendFileToBackend}
                      >
                Read Meta Data
              </button>
            </div>
          </div>
        </div>
      </>
  );
}

export default UploadFile;
