import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Court Booking API',
      version: '1.0.0',
      description: 'API for managing court bookings, including user authentication and slot reservations.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60d5ecb74b24c72b8c8b4567',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              example: 'hashedpassword',
            },
          },
        },
        Court: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60d5ecb74b24c72b8c8b4568',
            },
            name: {
              type: 'string',
              example: 'Tennis Court 1',
            },
            location: {
              type: 'string',
              example: 'Downtown Sports Complex',
            },
            sportType: {
              type: 'string',
              example: 'Tennis',
            },
            pricePerHour: {
              type: 'number',
              example: 50,
            },
          },
        },
        Slot: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60d5ecb74b24c72b8c8b4569',
            },
            courtId: {
              type: 'string',
              example: '60d5ecb74b24c72b8c8b4568',
            },
            date: {
              type: 'string',
              example: '2023-10-01',
            },
            time: {
              type: 'string',
              example: '10:00',
            },
            isBooked: {
              type: 'boolean',
              example: false,
            },
            bookedBy: {
              type: 'string',
              example: '60d5ecb74b24c72b8c8b4567',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Paths to files containing OpenAPI definitions
};

const specs = swaggerJSDoc(options);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
