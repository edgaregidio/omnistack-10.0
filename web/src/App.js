import React, { useState, useEffect } from 'react';
import api from './services/Api';

import './global.css';
import './Sidebar.css';
import './Main.css';
import './App.css';


import DevForm from './components/Devform'
import DevItem from './components/Devitem/index'

// Componente:
// É uma função que retorna algum conteundo HTML, CSS ou JS.
// Um bloco isolado de HTML, CSS e JS o qual não interfere no restante da aplicação.

// Propriedade
// Informações que um componente PAI(App) passa para um componente FILHO

// Estado
// Informação mantidas pelo componentes (Lembrar: Imutabilidade)   

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)  
    setDevs([...devs, response.data])
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
             <DevItem key={dev._id} dev={dev}/>
          ))}

        </ul>

      </main>
    </div>
  );
}

export default App;
