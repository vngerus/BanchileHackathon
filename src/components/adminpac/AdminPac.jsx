import React from 'react';
import './adminpac.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function AdminPac() {
  return (
    <>
      <div className='admin-pac-container'>
        <div className='blue-rectangle'>Administrador PAC</div>
      </div>

      <div>
        <div className='search-container'>
          <form action='#' method='get'>
            <input
              FontAwesomeIcon
              icon={faSearch}
              type='text'
              name='search'
              id='search'
              placeholder='Buscar...'
            />
          </form>
        </div>
        <div className='form-container'>
          <div className='form-row'>
            <input type='checkbox' style={{ marginRight: '10px' }} />
          </div>
          <div className='form-field'>RUT/RUN.</div>
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
