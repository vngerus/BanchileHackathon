import React, { useState } from 'react';
import './adminpac.css';
import { Link } from 'react-router-dom';
import '../adminpac/Data';

import Filtro from './filter.svg';

function AdminPac() {
  const [filtroVisible, setFiltroVisible] = useState(false);

  const [rutRunFilter, setRutRunFilter] = useState('');
  const [nombreFilter, setNombreFilter] = useState('');
  const [bancoFilter, setBancoFilter] = useState('');
  const [numeroCuentaFilter, setNumeroCuentaFilter] = useState('');
  const [montoFilter, setMontoFilter] = useState('');
  const [productoFilter, setProductoFilter] = useState('');
  const [codigoServicioFilter, setCodigoServicioFilter] = useState('');

  const abrirFiltro = () => {
    setFiltroVisible(true);
  };

  const cerrarFiltro = () => {
    setFiltroVisible(false);
  };

  const filtrarDatos = () => {
    console.log({
      rutRunFilter,
      nombreFilter,
      bancoFilter,
      numeroCuentaFilter,
      montoFilter,
      productoFilter,
      codigoServicioFilter,
    });
  };

  return (
    <>
      <div className='admin-pac-container'>
        <div className='blue-rectangle'>Administrador PAC</div>
      </div>
      <div>
        <img
          src={Filtro}
          alt='Logo'
          className='search-container'
          onClick={abrirFiltro}
        />
      </div>
      {/* AÑADIR SELECCIONADOR AL FILTRO, NO OLVIDAR */}
      {filtroVisible && (
        <div className='filtro-popup'>
          <div>
            <input
              type='text'
              placeholder='RUT/RUN'
              value={rutRunFilter}
              onChange={(e) => setRutRunFilter(e.target.value)}
            />
            <input
              type='text'
              placeholder='Nombre'
              value={nombreFilter}
              onChange={(e) => setNombreFilter(e.target.value)}
            />
            <input
              type='text'
              placeholder='Banco'
              value={bancoFilter}
              onChange={(e) => setBancoFilter(e.target.value)}
            />
            <input
              type='text'
              placeholder='N° Cuenta'
              value={numeroCuentaFilter}
              onChange={(e) => setNumeroCuentaFilter(e.target.value)}
            />
            <input
              type='text'
              placeholder='Monto ($)'
              value={montoFilter}
              onChange={(e) => setMontoFilter(e.target.value)}
            />
            <input
              type='text'
              placeholder='Producto'
              value={productoFilter}
              onChange={(e) => setProductoFilter(e.target.value)}
            />
            <input
              type='text'
              placeholder='Código Servicio'
              value={codigoServicioFilter}
              onChange={(e) => setCodigoServicioFilter(e.target.value)}
            />
          </div>

          <button onClick={filtrarDatos}>Filtrar</button>
          <button onClick={cerrarFiltro}>Cerrar</button>
        </div>
      )}

      <div>
        <div className='search-container'></div>
        <div className='form-container'>
          <div className='form-row'>
            <input type='checkbox' style={{ marginRight: '10px' }} />
          </div>
          <div className='form-field'>RUT/RUN</div>
          <div className='form-field'>Nombre</div>
          <div className='form-field'>Banco</div>
          <div className='form-field'>N° Cuenta</div>
          <div className='form-field'>Monto ($)</div>
          <div className='form-field'>Producto</div>
          <div className='form-field'>Código Servicio</div>
        </div>
      </div>
    </>
  );
}

export default AdminPac;
