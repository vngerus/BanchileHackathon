import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Data({ page, datos, selectAll, onToggleRowSelection }) {
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

  /* const URL = `http://localhost:8080/filtrar`;

  const [page, setData] = useState([]); */

  /* useEffect(() => {
    axios.get(URL).then((response) => setData(response.data.content));
  }, [URL]); // Agregamos URL como dependencia del useEffect */

  return (
    <div className='border-table-margin'>
      <table className='table'>
        <thead className='table-header'>
          <tr>
            <th className='check-ancho'>
              <input className='check-box' type='checkbox'></input>
            </th>
            <th scope='col'>RUT</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Banco</th>
            <th scope='col'>N cuenta</th>
            <th scope='col'>Monto</th>
            <th scope='col'>Producto</th>
            <th scope='col'>Codigo Servicio</th>
            <th scope='col'>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {page.map((client, index) => (
            <tr key={index}>
              <td className='checkbox-ancho'>
                <input
                  className='check-box'
                  type='checkbox'
                  checked={selectAll || selectedItems.includes(index)}
                  onChange={() => toggleItemSelection(index)}
                />
              </td>
              <td>{client[0]}</td>
              <td>{client[1]}</td>
              <td>{client[2]}</td>
              <td>{client[3]}</td>
              <td>{client[4]}</td>
              <td>{client[5]}</td>
              <td>{client[6]}</td>
              <td>{client[7]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Data;
