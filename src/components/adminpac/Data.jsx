import React, { useState, useEffect } from 'react';

function Data({ datos, selectAll }) {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(datos.map((item, index) => index));
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, datos]);

  const toggleItemSelection = (index) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((item) => item !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  return (
    <div>
      <div className='form-data'>
        {datos.map((item, index) => (
          <div key={index} className='form-row'>
            <input
              className='check-box'
              type='checkbox'
              checked={selectAll || selectedItems.includes(index)}
              onChange={() => toggleItemSelection(index)}
            />
            <div className='form-field'>{item['RUT/RUN']}</div>
            <div className='form-field form-ancho'>{item['Nombre']}</div>
            <div className='form-field form-ancho'>{item['Banco']}</div>
            <div className='form-field'>{item['N° Cuenta']}</div>
            <div className='form-field'>{item['Monto ($)']}</div>
            <div className='form-field'>{item['Producto']}</div>
            <div className='form-field'>{item['Código Servicio']}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
