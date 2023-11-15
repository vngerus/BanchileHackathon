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

  const URL = `http://localhost:8080/filtrar?nombreCliente=Leta`;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         const result = await axios.get(`https://localhost:8080/filtrar?page=${page}&size=10`);
  //         setData(result.data.content);
  //         setTotalPages(result.data.totalPages);
  //     };

  //     fetchData();
  // }, [page]);

  useEffect(() => {
    axios.get(URL).then((response) => setData(response.data.content));
  }, []);

  return (
    // <div>
    //   <div className='form-data'>
    //     {datos.map((item, index) => (
    //       <div key={index} className='form-row'>
    //         <input
    //           className='check-box'
    //           type='checkbox'
    //           checked={selectAll || selectedItems.includes(index)}
    //           onChange={() => toggleItemSelection(index)}
    //         />
    //         <div className='form-field'>{item['RUT/RUN']}</div>
    //         <div className='form-field form-ancho'>{item['Nombre']}</div>
    //         <div className='form-field form-ancho'>{item['Banco']}</div>
    //         <div className='form-field'>{item['N° Cuenta']}</div>
    //         <div className='form-field'>{item['Monto ($)']}</div>
    //         <div className='form-field'>{item['Producto']}</div>
    //         <div className='form-field'>{item['Código Servicio']}</div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <table className="table">
      <thead>
        <tr>
          <th scope="col">RUT</th>
          <th scope="col">Nombre</th>
          <th scope="col">Banco</th>
          <th scope="col">N cuenta</th>
          <th scope="col">Monto</th>
          <th scope="col">Producto</th>
          <th scope="col">Codigo Servicio</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {data.map((client) => (
          <tr>
            <td>{client[0]}</td>
            <td>{client[1]}</td>
            <td>{client[2]}</td>
            <td>{client[3]}</td>
            <td>{client[4]}</td>
            <td>{client[5]}</td>
            <td>{client[6]}</td>
            <td>{client[7]}</td>
          </tr>
        ))
        }
      </tbody>
    </table>
  );
}

export default Data;
