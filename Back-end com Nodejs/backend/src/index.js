const express = require('express');
const { query, request } = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

// Função MIDDLEWARE
function logRequests(request, response, next) {
	const { method, url} = request;
	
	const logLabel = `[${method.toUpperCase()}] ${url}`;
    // console.log(logLabel);
  
    console.time(logLabel); // medir o tempo de console ate o outro
        
    next(); // Próximo Middleware

    console.timeEnd(logLabel);
}

function validateprojectId(request, response, next){
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID.' });
    }

    return next();
}

app.use(logRequests);
app.use('/projects/id', validateprojectId);

// Criando rota para o conteudo que sera mostrado no browser
//Método GET = lista
app.get('/projects', (request, response) => {
    
    const {title} = request.query;

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

//Método POST = criar
app.post('/projects', (request, response) => {
    const {title, owner} = request.body;

    const project = { id: uuid(), title, owner };
 
    projects.push(project);

    return response.json(project);
});

//Método PUT = atualizar, modificar ou update
app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const {title, owner} = request.body;


    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json({ error: 'project not found.'})
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

//Método DELETE = deletar
app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json({ error: 'project not found.'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
   
});


// Criando servidor
app.listen(3333, () => {
    console.log('🚀️ Back-end started');
}); 