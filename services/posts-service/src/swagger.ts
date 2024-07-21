import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'posts Service API',
            version: '1.0.0',
            description: 'API documentation for the post Service',
        },
        servers: [
            {
                url: 'http://localhost:3002', // Adjust based on your server configuration
            },
        ],
        components: {
            securitySchemes: {
                jwtCookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "jwt",
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs
    security: [
        {
            jwtCookieAuth: [],
        },
    ],
    components: {
        responses: {
            headers: {
                "Set-Cookie": {
                    description: "Cookies set in the response",
                    schema: {
                        type: "string",
                    },
                },
            },
        },
    },
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: any) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};