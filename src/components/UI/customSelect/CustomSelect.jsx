import React from 'react';
import Select from 'react-select';

import './customSelect.scss';

function CustomSelect(props) {
    return (
        <Select {...props} 
            className='custom_select'
            styles={{
                control: (provided) => ({
                    ...provided, 
                    border: 'none',
                    boxShadow: 'none',
                        
                    }),
                option: (provided, state) => ({
                    ...provided,
                    background: state.isSelected ? 'lightgray' : 'white',
                })

            }}
        />
        // <select className='custom_select' value={value} onChange={e => onChange(e.target.value)}>
        //     <option disabled value="">{defaultValue}</option>
        //     {options.map(option => {
        //         return <option key={option.value} value={option.value}>{option.label}</option>
        //     })}
        // </select>
    );
}

export default CustomSelect;