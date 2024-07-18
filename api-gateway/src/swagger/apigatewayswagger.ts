import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gateway',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'], // Files containing Swagger annotations
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
