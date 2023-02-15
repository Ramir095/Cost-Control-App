import { dateReset } from "../../helpers";

import IcoAhorro from "../../img/icono_ahorro.svg";
import IcoCasa from "../../img/icono_casa.svg";
import IcoComida from "../../img/icono_comida.svg";
import IcoGastos from "../../img/icono_gastos.svg";
import IcoOcio from "../../img/icono_ahorro.svg";
import IcoSalud from "../../img/icono_salud.svg";
import IcoSuscripciones from "../../img/icono_suscripciones.svg";

const diccionarioIconos = {
  ahorro: IcoAhorro,
  comida: IcoComida,
  casa: IcoCasa,
  gastos: IcoGastos,
  ocio: IcoOcio,
  salud: IcoSalud,
  suscripciones: IcoSuscripciones,
};

const Gastos = ({ gasto }) => {
  const { cantidad, nombre, categorias, fecha } = gasto;
  return (
    <div className="gasto sombra">
      <div className="contenido-gasto">
        <img src={diccionarioIconos[categorias]} alt="Icono del gasto" />
        <div className="descripcion-gasto">
          <p className="categoria">{categorias}</p>
          <p className="nombre-gasto">{nombre}</p>
          <p className="fecha-gasto">
            Agregado el {""}
            <span>{dateReset(fecha)}</span>
          </p>
        </div>
      </div>
      <p className="cantidad-gasto">${cantidad}</p>
    </div>
  );
};

export default Gastos;
