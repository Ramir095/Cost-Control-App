import { useEffect, useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ListadoDeGastos from "./components/ListadoDeGastos";
import Modal from "./components/Modal";
import { idGenerator } from "./helpers";
import InconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  
  const handleClick = () => {
    setModal(true);
    setGastoEditar({});
    
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const handleSave = (data) => {
    if(data.id) {
      // Actualizar
      const gastoActualizado = gastos.map(g => g.id === data.id ? data : g)
      setGastos(gastoActualizado);
      setGastoEditar({})
    } else {
      // Nuevo gasto
      data.id = idGenerator();
      data.fecha = Date.now();
      setGastos([...gastos, data]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleDelete = (id) => {
    const gastosNoEliminados = gastos.filter(g => g.id !== id);
    setGastos(gastosNoEliminados);
  };

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto])

  useEffect(() => {
    const presupuestoLocal = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLocal > 0) {
      setIsValidPresupuesto(true)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categorias === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filters filtro={filtro} setFiltro={setFiltro} />
            <ListadoDeGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              handleDelete={handleDelete}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
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
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
