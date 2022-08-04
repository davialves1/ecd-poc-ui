import Header from "../shared/header";
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import DataContext from "../shared/data-context";
import {useNavigate} from "react-router-dom";

const UploadFile = () => {

  useEffect(() => {
    document.title = 'ECD | Select a file';
  });

  const {setMetaData} = useContext(DataContext);

  const [formData, setFormData] = useState(new FormData());

  const [fileName, setFileName] = useState('');

  const navigate = useNavigate();

  const buttonIsActive = () => !!formData.has('file');

  const updateFormData = (file) => {
    const newFormData = new FormData();
    newFormData.append('file', file);
    setFormData(newFormData);
    setMetaData(null);
    setFileName(file.name);
  };

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

  const onChangeFile = (event) => {
    const file = event.target.files[0];
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div id="drop-file-zone"
               className="bg-light"
               style={{
                 marginTop: 20,
                 width: '100%',
                 height: 400,
                 borderRadius: 10,
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',}}
               onDragOver={onDragOver}
               onDropCapture={onDropFile}>
            <form>
              <input id="file-selector"
                     style={{margin: 40, display: "none"}}
                     type="file"
                     onChange={onChangeFile} />
              <label className="btn btn-primary px-5 py-3" htmlFor="file-selector">
                Drag or select a file
              </label>
              <p style={{padding: 20}}>{fileName}</p>
              <br/>
            </form>
          </div>
        </div>
    );
  }

  return (
      <>
        <Header />
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
                Send the file
              </button>
            </div>
          </div>
        </div>
      </>
  );
}

export default UploadFile;
