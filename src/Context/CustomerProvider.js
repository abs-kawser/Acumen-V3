import React, {createContext, useState} from 'react';

export const CustomerContext = createContext();

const CustomerProvider = ({children}) => {
  const [selectedCustomerType, setSelectedCustomerType] = useState('Default');
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const [showInput, setShowInput] = useState(false);
  const [showCustomerFields, setShowCustomerFields] = useState(false);

  const setDropdownValue = value => {
    setSelectedCustomerType(value);
  };

  return (
    <CustomerContext.Provider value={{ selectedCustomerType, setSelectedCustomerType,selectedCustomer, setSelectedCustomer,showInput, setShowInput,showCustomerFields, setShowCustomerFields }}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;
