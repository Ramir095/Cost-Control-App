import React from 'react'
import Gastos from '../Gastos'

const ListadoDeGastos = ({ gastos }) => {
    console.log("listad", gastos);
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length ? "Gastos" : "No se encontraron gastos registrados"}</h2>
        {
            gastos.map(gasto => (
                <Gastos key={gasto.id} gasto={gasto}/>
            ))
        }
    </div>
  )
}

export default ListadoDeGastos