import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';

function Data({ page, datos, selectAll, onSelectAll, onToggleRowSelection }) {
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

  const handleSelectAll = () => {
    if (selectAll) {
      onSelectAll(false);
      setSelectedItems([]);
    } else {
      onSelectAll(true);
      setSelectedItems(datos.map((_, index) => index));
    }
  };

  const convertirMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto)
  };

  return (
    <div className='border-table-margin'>
      <table className='table'>
        <thead className='table-header'>
          <tr>
            <th className=''>
              <input
                className='check-box'
                type='checkbox'
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>RUT/RUN</th>
            <th>Nombre</th>
            <th>Banco</th>
            <th>N° cuenta</th>
            <th>Monto</th>
            <th>Producto</th>
            <th>Código Servicio</th>
            <th>Fecha de Pago</th>
          </tr>
        </thead>
        <tbody>
          {page.map((client, index) => (
            <tr key={index} className={selectedItems.includes(index) ? 'fila-seleccionada' : ''}>
              <td className=''>
                <input
                  className='check-box'
                  type='checkbox'
                  checked={selectedItems.includes(index)}
                  onChange={() => toggleItemSelection(index)}
                />
              </td>
              <td>{client[0]}</td>
              <td>{client[1]}</td>
              <td>{client[2]}</td>
              <td>{client[3]}</td>
              <td>{convertirMonto(client[4])}</td>
              <td>{client[5]}</td>
              <td>{client[6]}</td>
              <td>
                {format(parseISO(client[7]), 'dd/MM/yyyy', { locale: es })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Data;
