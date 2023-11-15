import React, { useState, useEffect } from 'react';
import './adminpac.css';
import Data from '../adminpac/Data';
import Banchile from './icono.png';
import tusDatos from './Data.json';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { set } from 'date-fns';

function AdminPac() {

  const [filtroVisible, setFiltroVisible] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [rutRunFilter, setRutRunFilter] = useState('');
  const [nombreFilter, setNombreFilter] = useState('');
  const [bancoFilter, setBancoFilter] = useState('');
  const [numeroCuentaFilter, setNumeroCuentaFilter] = useState('');
  const [montoMinFilter, setMontoMinFilter] = useState('');
  const [montoMaxFilter, setMontoMaxFilter] = useState('');
  const [productoFilter, setProductoFilter] = useState('');
  const [codigoServicioFilter, setCodigoServicioFilter] = useState('');

  const [url, setUrl] = useState(`http://localhost:8080/filtrar`); //Filtro
  const [page, setPage] = useState([]); //Filtro
  const [maxPages, setMaxPages] = useState(0);
  const [actualPage, setActualPage] = useState(0);

  useEffect(() => {
    axios.get(url, { params: { page: actualPage } }).then((response) => {
      setPage(response.data.content);
      setMaxPages(response.data.totalPages);
    });
  }, [url, actualPage]);
  
  const Izq = () => {
    if (actualPage > 0) {
      setActualPage(actualPage - 1);
    }
  };
  
  const Der = () => {
    if (actualPage < maxPages - 1) {
      setActualPage(actualPage + 1);
    }
  };

  const abrirFiltro = () => {
    setFiltroVisible(true);
  };

  const cerrarFiltro = () => {
    setFiltroVisible(false);
  };

  const [fechaPagoFilter, setFechaPagoFilter] = useState('');
  const [tipoProductoFilter, setTipoProductoFilter] = useState('');

  const filtrarDatos = () => {
    let urlAux = 'http://localhost:8080/filtrar?';

    urlAux +=
      rutRunFilter === '' ? '' : `rut=${encodeURIComponent(rutRunFilter)}&`;
    urlAux +=
      nombreFilter === ''
        ? ''
        : `nombreCliente=${encodeURIComponent(nombreFilter)}&`;
    urlAux +=
      productoFilter === ''
        ? ''
        : `nombreProducto=${encodeURIComponent(productoFilter)}&`;
    urlAux +=
      bancoFilter === ''
        ? ''
        : `nombreBanco=${encodeURIComponent(bancoFilter)}&`;
    urlAux +=
      numeroCuentaFilter === ''
        ? ''
        : `cuentaId=${encodeURIComponent(numeroCuentaFilter)}&`;
    urlAux +=
      montoMinFilter === ''
        ? ''
        : `minMonto=${encodeURIComponent(montoMinFilter)}&`;
    urlAux +=
      montoMaxFilter === ''
        ? ''
        : `maxMonto=${encodeURIComponent(montoMaxFilter)}&`;
    urlAux +=
      codigoServicioFilter === ''
        ? ''
        : `pacId=${encodeURIComponent(codigoServicioFilter)}&`;
    urlAux +=
      fechaPagoFilter === ''
        ? ''
        : `dia=${encodeURIComponent(fechaPagoFilter)}&`;
    urlAux = urlAux.slice(0, -1);

    console.log(urlAux);
    setUrl(urlAux);
    return;
  };

  const toggleRowSelection = (index) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedSelectedRows = prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((i) => i !== index)
        : [...prevSelectedRows, index];
  
      // Si todos los elementos están seleccionados, desmarcar el checkbox de selección de todos
      const allSelected = updatedSelectedRows.length === page.length;
      setSelectAll(allSelected ? false : selectAll);
  
      return updatedSelectedRows;
    });
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
  
    if (selectAll) {
      // Si se seleccionan todos, sumar el monto de todas las filas
      totalAmount = page.reduce((total, data) => total + parseFloat(data[4]), 0);
    } else {
      // Si no se seleccionan todos, sumar el monto solo de las filas seleccionadas
      const selectedData = page.filter((data, index) => selectedRows.includes(index));
      totalAmount = selectedData.reduce((total, data) => total + parseFloat(data[4]), 0);
    }
  
    setMontoTotal(totalAmount);
  };
  const toggleSelectAll = () => {
    setSelectAll((prev) => !prev);
    calculateTotalAmount();
  };

  const iniPages = 1;
  const finPages = 20;

  

  const header = [
    'RUT/RUN',
    'Nombre',
    'Banco',
    'N° Cuenta',
    'Monto',
    'Producto',
    'Código Servicio',
    'Fecha de pago',
  ];

  const exportSelectedData = () => {
    const selectedData = page.filter((data, index) => {
      if (selectAll) {
        // Si se seleccionan todos, filtrar por los filtros individuales
        return (
          (!rutRunFilter || data[0].includes(rutRunFilter)) &&
          (!nombreFilter || data[1].includes(nombreFilter)) &&
          (!fechaPagoFilter || data[7].includes(fechaPagoFilter)) &&
          (!tipoProductoFilter || data[5] === tipoProductoFilter)
        );
      } else {
        // Si no se seleccionan todos, solo considerar las filas seleccionadas
        return selectedRows.includes(index);
      }
    });

    const wsData = [header]; // Agregamos el encabezado como primera fila
    selectedData.forEach((data) => {
      const rowData = header.map(
        (headerName) => data[header.indexOf(headerName)]
      );
      wsData.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SelectedData');
    XLSX.writeFile(wb, 'selected_data.xlsx');
  };

  const [montoTotal, setMontoTotal] = useState(0);

  useEffect(() => {
    // Calcular el monto total basado en los datos seleccionados
    const selectedData = page.filter((data, index) => (selectAll || selectedRows.includes(index)));
    const calculatedTotal = selectedData.reduce(
      (total, data) => total + parseFloat(data[4]),
      0
    );
  
    setMontoTotal(calculatedTotal);
  }, [page, selectedRows, selectAll]);

  const convertirMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto);
  };
  return (
    <>
      <div className="admin-pac-container">
        <div className="blue-rectangle">Administrador PAC</div>

        <div className="caja-blanca">
          <div className="header-table">
            <a className="filtro" onClick={abrirFiltro}>
              <svg
                className="hp-30"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.5 1.5C1.5 1.36739 1.55268 1.24021 1.64645 1.14645C1.74021 1.05268 1.86739 1 2 1H14C14.1326 1 14.2598 1.05268 14.3536 1.14645C14.4473 1.24021 14.5 1.36739 14.5 1.5V3.5C14.5 3.62331 14.4544 3.74226 14.372 3.834L10 8.692V13.5C9.99992 13.6049 9.96685 13.7071 9.90547 13.7922C9.8441 13.8772 9.75752 13.9409 9.658 13.974L6.658 14.974C6.58287 14.999 6.50288 15.0058 6.4246 14.9939C6.34632 14.982 6.272 14.9516 6.20775 14.9053C6.1435 14.859 6.09116 14.7982 6.05504 14.7277C6.01893 14.6572 6.00006 14.5792 6 14.5V8.692L1.628 3.834C1.54561 3.74226 1.50002 3.62331 1.5 3.5V1.5Z" />
              </svg>
              <span className="fsp-21 fw-600 psp-10">Filtrar</span>
            </a>

            <div className="banchile">
              <img src={Banchile} className="hp-70" />
            </div>

            <div className="pages">
              <div className="fsp-18">
                {iniPages}-{finPages}
              </div>
              <div id="prev-page1" className="boton" onClick={Izq}>
                <svg className="wp-15" viewBox="0 0 19 35">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.4435 0.569514C19.1855 1.32887 19.1855 2.56002 18.4435 3.31937L4.58701 17.5L18.4435 31.6806C19.1855 32.44 19.1855 33.6711 18.4435 34.4305C17.7015 35.1898 16.4985 35.1898 15.7565 34.4305L0.556499 18.8749C-0.185498 18.1156 -0.185498 16.8844 0.556499 16.1251L15.7565 0.569515C16.4985 -0.189838 17.7015 -0.189838 18.4435 0.569514Z"
                  />
                </svg>
              </div>
              <div id="prev-page2" className="boton" onClick={Der}>
                <svg className="wp-15 ro-180" viewBox="0 0 19 35">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.4435 0.569514C19.1855 1.32887 19.1855 2.56002 18.4435 3.31937L4.58701 17.5L18.4435 31.6806C19.1855 32.44 19.1855 33.6711 18.4435 34.4305C17.7015 35.1898 16.4985 35.1898 15.7565 34.4305L0.556499 18.8749C-0.185498 18.1156 -0.185498 16.8844 0.556499 16.1251L15.7565 0.569515C16.4985 -0.189838 17.7015 -0.189838 18.4435 0.569514Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {filtroVisible && (
            <div className="filtro-popup">
              <button className='cierre' onClick={cerrarFiltro}>x</button>
              <div className="psp-20 pep-20">
                <input
                  type="text"
                  className="filtro-selected"
                  placeholder="RUT/RUN"
                  value={rutRunFilter}
                  onChange={(e) => setRutRunFilter(e.target.value)}
                />
                <input
                  type="text"
                  className="filtro-selected"
                  placeholder="Nombre"
                  value={nombreFilter}
                  onChange={(e) => setNombreFilter(e.target.value)}
                />
                {/*                 <input
                  type='text'
                  className='filtro-selected'
                  placeholder='Banco'
                  value={bancoFilter}
                  onChange={(e) => setBancoFilter(e.target.value)}
                /> */}
                <select className="filtro-banco" onChange={(e) => setBancoFilter(e.target.value)}>
                  <option value="">Filtrar banco</option>
                  <option value="Santander">Santander</option>
                  <option value="Bancoestado">Banco Estado</option>
                  <option value="BCI">BCI</option>
                  <option value="Itau">Banco Itaú</option>
                </select>
                <input
                  type="text"
                  className="filtro-selected"
                  placeholder="N° Cuenta"
                  value={numeroCuentaFilter}
                  onChange={(e) => setNumeroCuentaFilter(e.target.value)}
                />
                <input
                  type="text"
                  className="filtro-selected"
                  placeholder="$ Monto minimo"
                  value={montoMinFilter}
                  onChange={(e) => setMontoMinFilter(e.target.value)}
                />
                <input
                  type="text"
                  className="filtro-selected"
                  placeholder="$ Monto máximo"
                  value={montoMaxFilter}
                  onChange={(e) => setMontoMaxFilter(e.target.value)}
                />
                <div className="f-nunito">
                  <div className="titulo-casilla">Producto</div>
                  <div className="control-group" onChange={(e) => setProductoFilter(e.target.value)}>
                    <label className="control control-radio">
                      Ninguno
                      <input type="radio" name="producto" value="" defaultChecked/>
                      <div className="control_indicator"></div>
                    </label>
                    <label className="control control-radio">
                      APV
                      <input type="radio" name="producto" value="APV" />
                      <div className="control_indicator"></div>
                    </label>
                    <label className="control control-radio">
                      Mis Metas
                      <input type="radio" name="producto" value="Mis Metas" />
                      <div className="control_indicator"></div>
                    </label>
                  </div>
                </div>
                <input
                  type="text"
                  className="filtro-selected"
                  placeholder="Código Servicio"
                  value={codigoServicioFilter}
                  onChange={(e) => setCodigoServicioFilter(e.target.value)}
                />
                <div>
                  <div className="titulo-casilla">Día de pago</div>
                  <div className="control-group" onChange={(e) => setFechaPagoFilter(e.target.value)}>
                    <label className="control control-radio">
                      Sin filtro
                      <input type="radio" name="dia" value='' defaultChecked />
                      <div className="control_indicator"></div>
                    </label>
                    <label className="control control-radio">
                      5 del mes
                      <input type="radio" name="dia" value='5' />
                      <div className="control_indicator"></div>
                    </label>
                    <label className="control control-radio">
                      10 del mes
                      <input type="radio" name="dia" value='10' />
                      <div className="control_indicator"></div>
                    </label>
                    <label className="control control-radio">
                      15 del mes
                      <input type="radio" name="dia" value='15' />
                      <div className="control_indicator"></div>
                    </label>
                    <label className="control control-radio">
                      20 del mes
                      <input type="radio" name="dia" value='20' />
                      <div className="control_indicator"></div>
                    </label>
                  </div>
                </div>

                {/* <div
                  className='form-field product-toggle'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ marginRight: '10px' }}>APV</span>
                  <label className='switch'>
                    <input
                      type='checkbox'
                      onChange={() =>
                        setProductoFilter(
                          productoFilter === 'APV' ? 'Mis Metas' : 'APV'
                        )
                      }
                    />
                    <span className='slider round'></span>
                  </label>
                  <span style={{ marginLeft: '10px' }}>Mis Metas</span>
                </div> */}
              </div>

              <div className="botones-filtro">
                <button className="filtro-btn" onClick={filtrarDatos}>
                  Filtrar
                </button>
                <button className="cerrar-btn" onClick={cerrarFiltro}>
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {/* <div className='form-container'>
            <div className='check-box'>
              <input
                type='checkbox'
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </div>
            <div className='form-field'>RUT/RUN</div>
            <div className='form-field form-ancho'>Nombre</div>
            <div className='form-field form-ancho'>Banco</div>
            <div className='form-field'>N° Cuenta</div>
            <div className='form-field'>Monto ($)</div>
            <div className='form-field'>Producto</div>
            <div className='form-field'>Código Servicio</div>
          </div> */}

          <Data
            page={page}
            datos={tusDatos}
            selectAll={selectAll}
            onToggleRowSelection={toggleRowSelection}
            onSelectAll={toggleSelectAll}
          />
        </div>

        {/* BOTON FINAL */}
        <div className="hp-25"></div>
        <div className="monto">
          <span className="fsp-24 fw-600 pep-20">
            Monto total: {convertirMonto(montoTotal)}
          </span>
        </div>

        <div className="boton-exportar" onClick={exportSelectedData}>
          <span className="fsp-24 fw-600 pep-20">Exportar selección</span>
          <svg className="hp-25" viewBox="0 0 30 30">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.81818 2.72727C4.55884 2.72727 2.72727 4.55883 2.72727 6.81818V23.1818C2.72727 25.4412 4.55884 27.2727 6.81818 27.2727H23.1818C25.4412 27.2727 27.2727 25.4412 27.2727 23.1818V17.4545C27.2727 16.7014 27.8832 16.0909 28.6364 16.0909C29.3895 16.0909 30 16.7014 30 17.4545V23.1818C30 26.9474 26.9474 30 23.1818 30H6.81818C3.0526 30 0 26.9474 0 23.1818V6.81818C0 3.0526 3.0526 0 6.81818 0H14.1818C14.9349 0 15.5455 0.610521 15.5455 1.36364C15.5455 2.11675 14.9349 2.72727 14.1818 2.72727H6.81818Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27.2341 12.6538C27.2341 13.3973 27.8533 14 28.6171 14C29.3809 14 30.0001 13.3973 30.0001 12.6538L30.0001 0H18.383C17.6192 0 17.0001 0.602694 17.0001 1.34615C17.0001 2.08962 17.6192 2.69231 18.383 2.69231L25.7013 2.69231L5.96347 22.4302C5.43145 22.9622 5.43145 23.8248 5.96347 24.3568C6.49549 24.8888 7.35807 24.8888 7.8901 24.3568L27.2341 5.01278V12.6538Z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default AdminPac;
