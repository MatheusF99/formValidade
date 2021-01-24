import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core'

import './styles/input.css'

// import { Container } from './styles';

function Input( {name, ...rest} ) {

   const inputRef = useRef(null) 
  
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
      registerField({
          name: fieldName,
          ref: inputRef.current,
          path: 'value',
      })
  }, [registerField,fieldName])

  return (
    <div>   
        <input ref={inputRef} defaultValue={defaultValue} {...rest} placeholder={fieldName}/>
        {
            error && <span style={
                                    {color: '#f45', 
                                    display: 'flex',
                                    flexDirection: 'column'}
                                }
                     >{error}</span>
        }
    </div>
  );
}

export default Input;