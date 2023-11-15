import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Data({ datos, selectAll, onToggleRowSelection }) {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(datos.map((_, index) => index));
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
    onToggleRowSelection(index);
  };

  const URL = `http://localhost:8080/filtrar`;

  useEffect(() => {
    axios.get(URL).then((data) => console.log(data));
  }, []);

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
            <table className='table'>
              <tbody>
                <thead>
                  <tr>
                    <th className='form-field'>{item['RUT/RUN']}</th>
                    <th className='form-field form-ancho'>{item['Nombre']}</th>
                    <th className='form-field form-ancho'>{item['Banco']}</th>
                    <th className='form-field'>{item['N° Cuenta']}</th>
                    <th className='form-field'>{item['Monto ($)']}</th>
                    <th className='form-field'>{item['Producto']}</th>
                    <th className='form-field'>{item['Código Servicio']}</th>
                  </tr>
                </thead>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
