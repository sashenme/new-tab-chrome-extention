import React from 'react'
import Select from "react-select";

interface SelectDropdownProps{
  name: string,
  options: {label: string; value: string}[] | []

}

const SelectDropdown: React.FC<SelectDropdownProps> = ({options}) => {
  return (
    <div className='col-span-6 '>
       <Select options={options} 
          placeholder="Search city.."
          className="text-base bg-transparent w- border border-transparent outline-0 focus:border-white/90 outline-white rounded-md px-2 py-1"

        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0)',
            background: state.isFocused ? '#232627':'transparent',
            color:'white',
            '&:hover': {cursor: 'text'}
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: 'white',            
            fontFamily: 'Inter'
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: 'white',
            fontFamily: 'Inter'
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            color: 'black',
            fontSize:'.75rem',
            fontFamily: 'Inter'
          }),
          indicatorSeparator: () => ({
            display:'none',
          }),
          dropdownIndicator: (baseStyles,state) => ({
            ...baseStyles,
            opacity:state.isFocused ? '1':'0',
          }),
        }}
      />
    </div>
  )
}

export default SelectDropdown