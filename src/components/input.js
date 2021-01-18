import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core'

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
      <input ref={inputRef} {...rest} />
  );
}

export default Input;