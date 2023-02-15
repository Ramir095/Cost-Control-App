import React, { useEffect, useState } from 'react'

const ControlPresupuesto = ({ gastos, presupuesto }) => {

    const [ disponible, setDisponible ] = useState(0)
    const [ gastado, setGastado ] = useState(0)

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    useEffect(() => {
        const totalGastado = gastos.reduce((acc, gasto) => gasto.cantidad + acc, 0);
        const nuevoPresupuesto = presupuesto - totalGastado;

        setGastado(totalGastado)
        setDisponible(nuevoPresupuesto)
    }, [gastos])

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <p>Aqui va la grafica</p>
        </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto