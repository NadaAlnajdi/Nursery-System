const autogenswagger = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Nursery system',
    description: 'Description'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger.json';
const routes = ['./Routes/loginRouter.js','./Routes/teacherRoute.js','./Routes/childRouter.js','./Routes/classRouter.js'];


autogenswagger(outputFile, routes, doc);
