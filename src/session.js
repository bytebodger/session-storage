import { allow } from '@toolz/allow';
import { sessionStorageIsAvailable } from '@toolz/session-storage-is-available';

let temp = {};

const Session = () => {
   allow.setFailureBehavior(allow.failureBehavior.WARN);
   
   const clear = () => {
      if (sessionStorageIsAvailable())
         sessionStorage.clear();
      temp = {};
   };
   
   const getItem = (itemName = '', defaultValue = '__noDefaultValueSupplied__') => {
      allow.aString(itemName, is.not.empty);
      if (sessionStorageIsAvailable()) {
         const valueObject = JSON.parse(sessionStorage.getItem(itemName));
         if (valueObject === null) {
            if (defaultValue !== '__noDefaultValueSupplied__') {
               setItem(itemName, defaultValue);
               return defaultValue;
            }
            return null;
         }
         if (valueObject.hasOwnProperty('value')) {
            if (valueObject.value === null && defaultValue !== '__noDefaultValueSupplied__') {
               setItem(itemName, defaultValue);
               return defaultValue;
            }
            return valueObject.value;
         }
         return null;
      } else {
         if (temp.hasOwnProperty(itemName))
            return temp[itemName];
         else if (defaultValue !== '__noDefaultValueSupplied__') {
            temp[itemName] = defaultValue;
            return defaultValue;
         }
         return null;
      }
   };
   
   const is = {not: {empty: 1}};
   
   const removeItem = (itemName = '') => {
      allow.aString(itemName, is.not.empty);
      if (sessionStorageIsAvailable())
         sessionStorage.removeItem(itemName);
      else if (temp.hasOwnProperty(itemName))
         delete temp[itemName];
      return true;
   };
   
   const setItem = (itemName = '', itemValue) => {
      allow.aString(itemName, is.not.empty);
      if (sessionStorageIsAvailable()) {
         const valueToBeSerialized = {value: itemValue};
         const serializedValue = JSON.stringify(valueToBeSerialized);
         sessionStorage.setItem(itemName, serializedValue);
      } else {
         temp[itemName] = itemValue;
      }
      return itemValue;
   };
   
   return {
      clear,
      getItem,
      removeItem,
      setItem,
   };
};

export const session = Session();
