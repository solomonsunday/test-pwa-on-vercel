import { Combobox } from "@headlessui/react";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import { useState } from "react";

// Define type for the option value and label
type Option = {
  value: string;
  label: string;
};

// Define type for the Select component props
type SelectProps = {
  options: Option[];
  onSelect: (value: string) => void;
  label: string;
  usage: string;
};

const SearchableSelect = ({ options, onSelect, label, usage }: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  
    const handleSelect = (value: string) => {
      setSelectedValue(value);
      onSelect(value);
    };
  
    return (
      <Combobox value={selectedValue} onChange={handleSelect}>
         <Combobox.Label as="div" className=" text-gray-500 pb-3">{label}</Combobox.Label>
        <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
           
            
            <Combobox.Input
              placeholder= {label}
              className="w-full border-none outline-none py-2 pl-3 pr-10 text-sm leading-5 text-black "
            />
             <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
       </div>
            <Combobox.Options className="w-full mt-1 rounded-md bg-white shadow-lg">
              {options.map((option) => (

                <Combobox.Option 
                  className= { 
                  `relative cursor-default select-none py-2 pl-10 pr-4 `
                   
                  }
                  
                  key={option.value} 
                  value={option.value}>

                  { usage =='user' ? `${option.label} - ${option.value}` :  option.label} 
                </Combobox.Option>
              ))}
            </Combobox.Options>
        </Combobox>
      
    );
  };
  
  export default SearchableSelect;
  