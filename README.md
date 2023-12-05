# HEXA PULSE API

This REST API is built using key technologies such as Express, Docker, and PostgreSQL to provide a robust and scalable solution.

## Physical Diagram

![Physical Diagram](https://res.cloudinary.com/dbbixakcl/image/upload/f_auto,q_auto/v1/HexaPulseDevs/hexa-pulse-api/uyzlqxjufmfeova92jqt)

## Technologies

### Dependencies

- [Express](https://expressjs.com/): Web framework for Node.js that simplifies creating RESTful APIs and handles routes.
- [Dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file, improving project configuration.
- [Sequelize](https://sequelize.org/): ORM (Object-Relational Mapping) for SQL databases, facilitating interaction with databases.
- [pg](https://www.npmjs.com/package/pg): PostgreSQL client for Node.js, enabling interaction with PostgreSQL databases.
- [pg-hstore](https://www.npmjs.com/package/pg-hstore): JSON object serializer/deserializer for PostgreSQL data.
- [sequelize-cli](https://sequelize.org/docs/v6/other-topics/migrations/): Command-line tool for Sequelize, aiding in database management and code generation related to the ORM.
- [Boom](https://www.npmjs.com/package/@hapi/boom): Provides utilities for handling HTTP errors in Node.js.
- [Cors](https://www.npmjs.com/package/cors): Middleware allowing control of API access from different origins.
- [Helmet](https://www.npmjs.com/package/helmet): Helps protect your Express app by setting various security-related HTTP headers.
- [Joi](https://www.npmjs.com/package/joi): Data validation library for JavaScript. Allows defining schemas and validating JavaScript object shape and content.
- [Passport](http://www.passportjs.org/): Authentication middleware for Node.js.
- [Passport-JWT](https://www.npmjs.com/package/passport-jwt): Passport strategy for authenticating with JSON Web Token (JWT).
- [Passport-Local](https://www.npmjs.com/package/passport-local): Passport strategy for authenticating with a username and password.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JSON Web Token implementation for Node.js.
- [bcrypt](https://www.npmjs.com/package/bcrypt): Library for hashing passwords.

### Development Dependencies

- [ESLint](https://eslint.org/): Linter tool to identify and report patterns in JavaScript code.
- [Nodemon](https://nodemon.io/): Monitors changes in source code and automatically restarts the server.

## Environment Variables

Before running this application, ensure the following environment variables are configured:

- `NODE_ENV`: Application environment mode.
- `PORT`: Port on which the server will run.
- `DB_NAME`: Database name.
- `DB_HOST`: Database host address.
- `DB_PORT`: Database port.
- `DB_USER`: Database user.
- `DB_PASSWORD`: Database password.
- `DATABASE_URL`: Database connection URL.

## Authors

### BranLeeDev

### Pedro Cevallos
