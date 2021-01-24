import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core'

import './input.css'

// import { Container } from './styles';

function Input( {name, ...rest} ) {

   const inputRef = useRef(null) 
  
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
      registerField({
          name: fieldName,
          ref: inputRef.current,
          path: 'value'
      })
  }, [registerField,fieldName])

  return (
    <>   
        <input ref={inputRef} defaultValue={defaultValue} {...rest} />
        {
            error && <span style={
                                    {color: '#f45', 
                                    display: 'flex',
                                    flexDirection: 'column'}
                                }
                     >{error}</span>
        }
    </>
  );
}

export default Input;