# HEXA PULSE API

The HEXA PULSE API is a REST API developed using key technologies such as Express, Docker, and PostgreSQL to provide a robust and scalable solution.

## Physical Diagram

![Physical Diagram](https://res.cloudinary.com/dbbixakcl/image/upload/f_auto,q_auto/v1/HexaPulseDevs/hexa-pulse-api/uyzlqxjufmfeova92jqt)

## Technologies

### Dependencies

- [Express](https://expressjs.com/): Web framework for Node.js that simplifies creating RESTful APIs and handling routes.
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

## Contribution

Thank you for your interest in contributing to the HEXA PULSE API! We appreciate any contribution, including bug fixes, implementing new features, and improving documentation. To get started, please follow the guidelines below.

### Prerequisites

- Make sure you have Docker installed on your machine. You can find installation instructions on the official Docker website: [https://www.docker.com/get-started](https://www.docker.com/get-started).

### Getting Started

1. Fork the repository and clone it to your local machine.
2. Install dependencies by running `npm install`.
3. Create a new branch for your contribution: `git checkout -b my-new-branch`.
4. Make the necessary changes and commit your changes with descriptive messages.
5. Push your branch to your forked repository: `git push origin my-new-branch`.
6. Create a new pull request to the `main` branch of the HEXA PULSE API repository.

### Setting Up the Database with Docker

To run the HEXA PULSE API, it's important to have a database set up. Docker makes it easy to create and manage database containers. Follow the steps below to set up your database using Docker:

1. Stop the local PostgreSQL service by running the following command:

   ```bash
   sudo systemctl stop postgresql
   ```

   This step is necessary to avoid conflicts between the local PostgreSQL service and the Docker container's PostgreSQL service.

2. Open a terminal and navigate to the project directory.

3. Run the following command to start the Docker container:

   ```bash
   sudo docker compose up -d postgres
   ```

   This command starts the container defined in the `docker-compose.yml` file in detached mode.

4. Connect to the running container by executing the following command:

   ```bash
   sudo docker compose exec postgres bash
   ```

5. Once inside the container's shell, you can access the PostgreSQL command-line interface (CLI) by running the following command:

   ```bash
   psql -h localhost -d ${DB_NAME} -U ${DB_USER}
   ```

   This command connects to the PostgreSQL server running in the container using the specified hostname, database name, and username.

   Note: If you encounter any issues connecting to the database, check the container logs for any error messages that may provide hints on the problem.

6. Exit the PostgreSQL CLI by typing `\q` and press Enter.

7. Exit the container's shell by running the following command:

   ```bash
   exit
   ```

8. Finally, start the HEXA PULSE API server by running the command:

   ```bash
   npm run dev
   ```

With these steps, you now have your PostgreSQL database up and running in a Docker container, ready to be used by the HEXA PULSE API.

## Authors

- BranLeeDev
- Pedro Cevallos
