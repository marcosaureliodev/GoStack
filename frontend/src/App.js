import React, { useState, useEffect} from 'react';
import { render } from 'react-dom';

import api from './services/api'

import './App.css';

import Header from './components/Header';

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        //projects.push(`Novo projeto ${Date.now()}`);

        //Aqui estamos usando conceito de imutabilidade
        // setProjects([... projects, `Novo projeto ${Date.now()}`]);
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: "Marcos Aurélio"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects"/>
            
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;