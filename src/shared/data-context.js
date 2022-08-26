import React, {useState} from 'react';

const DataContext = React.createContext({});

export const DataProvider = ({children}) => {
  const [metaData, setMetaData] = useState();
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(1);
  const [selectedWorksheet, setSelectedWorksheet] = useState();
  const [worksheets, setWorksheets] = useState();

  return (
      <DataContext.Provider value={{
        metaData,
        setMetaData,
        file,
        setFile,
        progress,
        setProgress,
        selectedWorksheet,
        setSelectedWorksheet,
        worksheets,
        setWorksheets
      }}>
        {children}
      </DataContext.Provider>
  )
}

export default DataContext;
