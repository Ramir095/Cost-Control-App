import { useState } from "react";
import Header from "./components/Header";
import ListadoDeGastos from "./components/ListadoDeGastos";
import Modal from "./components/Modal";
import { idGenerator } from "./helpers";
import InconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState([]);

  const handleClick = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const handleSave = (data) => {
    data.id = idGenerator();
    data.fecha = Date.now();
    setGastos([...gastos, data]);
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <ListadoDeGastos gastos={gastos} />
          </main>
          <div className="nuevo-gasto">
            <img
              src={InconoNuevoGasto}
              alt="icono de nuevo gasto"
              onClick={handleClick}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;
