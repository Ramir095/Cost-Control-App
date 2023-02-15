import { useState } from "react";
import Mensaje from "../Mensaje";
import buttonCierre from "../../img/cerrar.svg";

const Modal = ({ setModal, animarModal, setAnimarModal, handleSave }) => {
  const [data, setData] = useState({
    nombre: "",
    cantidad: "",
    categorias: "",
    mensaje: ""
  });

  const handleData = (e) => {
    if (e.target.id === "cantidad") {
      setData({ ...data, [e.target.id]: Number(e.target.value) });
    } else {
      setData({
        ...data,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if([data.nombre, data.cantidad, data.categorias].includes('')) {
      setData({
        ...data,
        mensaje: "Todos los espacios deben de ser completados"
      })
      setTimeout(() => {
        setData({
          ...data,
          mensaje: ""
        })
      }, 2000)
      return
    }
      handleSave({
        nombre: data.nombre,
        cantidad: data.cantidad,
        categorias: data.categorias
      })

  };

  const handleCierre = () => {
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={buttonCierre} alt="boton de cierre" onClick={handleCierre} />
      </div>

      <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
        <legend>Nuevo gasto</legend>

        {
          data.mensaje && <Mensaje tipo="error">{data.mensaje}</Mensaje>
        }

        <div className="campo">
          <label htmlFor="nombre">Nombre del gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={data.nombre}
            onChange={handleData}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="XXXX"
            value={data.cantidad}
            onChange={handleData}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select id="categorias" onChange={handleData}>
            <option value="">Seleccione</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value="Añadir gasto" />
      </form>
    </div>
  );
};

export default Modal;
