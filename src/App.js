import React, { useState } from "react";
import api from './services/api';

import "./styles.css";
import { useEffect } from "react";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: `http://api.github.com/${Date.now()}`,
      techs: ["ReactJS"]
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
    console.log(typeof repositories);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repoIndex = repositories.findIndex(repository => repository.id === id);
    const newRepoList = [...repositories];
    newRepoList.splice(repoIndex, 1);
    setRepositories(newRepoList);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
