/* eslint-disable react/prop-types */
import React from 'react'

const Dropdown = ({title , options , func}) => {
  return (
    <div className='select'>
        <select  onChange={func} className='font-semibold bg-[#27272a] border-none outline-none text-white' name="format" id="format"  defaultValue="0">

          <option  value="0" disabled>
            {title}

          </option>

          {options.map((o,i)=>(
            <option key={i} value={o}>{o.toUpperCase()}</option>
          ))}

        </select>

    </div>
  )
}

export default Dropdown