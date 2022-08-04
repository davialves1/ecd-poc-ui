import React, {useState} from 'react';

const DataContext = React.createContext({});

// export const DataProvider = DataContext.Provider;

export const DataProvider = ({children}) => {
  const [metaData, setMetaData] = useState({file: 'Dummy initial data'});
  return (
      <DataContext.Provider value={{metaData, setMetaData}}>
        {children}
      </DataContext.Provider>
  )
}

export default DataContext;
