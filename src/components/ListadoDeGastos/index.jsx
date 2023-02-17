import React from "react";
import Gastos from "../Gastos";

const ListadoDeGastos = ({
  gastos,
  setGastoEditar,
  handleDelete,
  gastosFiltrados,
  filtro,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoria"}
          </h2>
          {gastosFiltrados.map((gasto) => (
            <Gastos
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              handleDelete={handleDelete}
            />
          ))}
        </>
      ) : (
        <>
          <h2>
            {gastos.length ? "Gastos" : "No se encontraron gastos registrados"}
          </h2>
          {gastos.map((gasto) => (
            <Gastos
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              handleDelete={handleDelete}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoDeGastos;
