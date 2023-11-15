import React, { useState } from 'react';
import './adminpac.css';
import Data from '../adminpac/Data';
import Banchile from './banchile-icon.png';
import tusDatos from './Data.json';

function AdminPac() {
  const [filtroVisible, setFiltroVisible] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

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

  const toggleSelectAll = () => {
    setSelectAll((prev) => !prev);
  };

  const iniPages = 1;
  const finPages = 50;
  const totalPages = 6958;

  return (
    <>
      <div className='admin-pac-container'>
        <div className='blue-rectangle'>Administrador PAC</div>

        <div className='caja-blanca'>
          <div className='header-table bgc-red'>
            <a className='filtro' onClick={abrirFiltro}>
              <svg
                className='hp-40'
                viewBox='0 0 16 16'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M1.5 1.5C1.5 1.36739 1.55268 1.24021 1.64645 1.14645C1.74021 1.05268 1.86739 1 2 1H14C14.1326 1 14.2598 1.05268 14.3536 1.14645C14.4473 1.24021 14.5 1.36739 14.5 1.5V3.5C14.5 3.62331 14.4544 3.74226 14.372 3.834L10 8.692V13.5C9.99992 13.6049 9.96685 13.7071 9.90547 13.7922C9.8441 13.8772 9.75752 13.9409 9.658 13.974L6.658 14.974C6.58287 14.999 6.50288 15.0058 6.4246 14.9939C6.34632 14.982 6.272 14.9516 6.20775 14.9053C6.1435 14.859 6.09116 14.7982 6.05504 14.7277C6.01893 14.6572 6.00006 14.5792 6 14.5V8.692L1.628 3.834C1.54561 3.74226 1.50002 3.62331 1.5 3.5V1.5Z' />
              </svg>
              <span className='fsp-24 fw-600 psp-10'>Filtrar</span>
            </a>
            <img src={Banchile} className='hp-70' />
            <div className='pages wp-200 hp-50 bgc-blue'>
              <span className=''>
                {iniPages}-{finPages} de {totalPages}
              </span>
              <div id='prev-page' className='boton'></div>
            </div>
          </div>

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

              <button className='filtro-btn' onClick={filtrarDatos}>
                Filtrar
              </button>
              <button className='cerrar-btn' onClick={cerrarFiltro}>
                Cerrar
              </button>
            </div>
          )}

          <div className='search-container'></div>
          <div className='form-container'>
            <div className='form-row'>
              <input
                type='checkbox'
                style={{ marginRight: '10px' }}
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </div>
            <div className='form-field'>RUT/RUN</div>
            <div className='form-field'>Nombre</div>
            <div className='form-field'>Banco</div>
            <div className='form-field'>N° Cuenta</div>
            <div className='form-field'>Monto ($)</div>
            <div className='form-field'>Producto</div>
            <div className='form-field'>Código Servicio</div>
          </div>

          {/* Pasa los datos al componente Data y el estado de selectAll */}
          <Data datos={tusDatos} selectAll={selectAll} />
        </div>

        {/* BOTON FINAL */}
        <div className='hp-25'></div>
        <div className='boton-exportar'>
          <span className='fsp-36 fw-600'>Exportar selección</span>
        </div>
      </div>
    </>
  );
}

export default AdminPac;
