import React, {createContext, useState} from 'react';

export const DataContext = createContext();

const DataProvider = ({children}) => {
  const [output, setOutput] = useState({
    selfAttSum:null,
    entryDraft:[]
  });

  return (
    <DataContext.Provider value={{output, setOutput}}>
      {children}
    </DataContext.Provider>
  );
};


export default DataProvider;