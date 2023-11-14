import React from 'react';
import './adminpac.css';
import { Link } from 'react-router-dom';

import Filtro from './filter.svg';

function AdminPac() {
  return (
    <>
      <div className='admin-pac-container'>
        <div className='blue-rectangle'>Administrador PAC</div>
      </div>
      <Link as={Link} to='/filtro'>
        <img src={Filtro} alt='Logo' className='search-container' />
      </Link>
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
