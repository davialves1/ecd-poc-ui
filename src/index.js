import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MetaData from "./pages/meta-data/meta-data";
import ReadFile from "./pages/read-file";
import UploadFile from "./pages/upload-file";
import {DataProvider} from "./shared/data-context";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <React.StrictMode>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MetaData />} />
            <Route path="upload" element={<UploadFile />} />
            <Route path="meta-data" element={<MetaData />} />
            <Route path="read-file" element={<ReadFile />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
