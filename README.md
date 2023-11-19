# E-Commerce Backend

# Project Title
<!-- Badges for version -->
![GitHub package version](https://img.shields.io/github/package-json/v/SideControlJS/e-commerce.svg)

<!-- Badges for code size -->
![Code Size](https://img.shields.io/github/languages/code-size/SideControlJS/e-commerce.svg)

<!-- Badges for last commit -->
![Last Commit](https://img.shields.io/github/last-commit/SideControlJS/e-commerce.svg)

<!-- Badges for social -->
![Stars](https://img.shields.io/github/stars/SideControlJS/e-commerce.svg?style=social)
![Forks](https://img.shields.io/github/forks/SideControlJS/e-commerce.svg?style=social)
![Watchers](https://img.shields.io/github/watchers/SideControlJS/e-commerce.svg?style=social)



## Description

This e-commerce backend application serves as a hands-on project for learning Object-Relational Mapping (ORM) using Sequelize. It provides an API for managing an e-commerce site's products, categories, and tags. The application is built with Express.js and interfaces with a MySQL database, facilitating the performance of CRUD operations via RESTful endpoints.

Throughout the development process, Insomnia REST Client was utilized extensively to test API routes, ensuring that the backend functionality met the required specifications for handling web requests effectively.

By leveraging the ORM approach, this project demonstrates the efficient management of database schemas and streamlines the process of querying and manipulating data in a relational database.

Watch the demo video here: 


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

## Installation

Before installing project dependencies, make sure you have Node.js and npm (Node Package Manager) installed. You can download and install Node.js from [nodejs.org](https://nodejs.org/), which includes npm.

To set up the project, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/SideControlJS/e-commerce.git
```

Navigate to the project directory:
```bash
cd your-repo-name

npm install express sequelize mysql2 dotenv

```
If you need to install additional dependencies that are specified in your package.json file, simply run:
```bash
npm install

```

## Usage

To starte the server, run: "node server.js"

Ensure that you have MySQL installed and running before attempting to connect to your database. Use the schema.sql file in the db folder to set up your database using MySQL shell commands.

## Environment Variables

Create a `.env` file in the root directory with the following variables:
- DB_NAME='ecommerce_db'
- DB_USER='your_mysql_username'
- DB_PW='your_mysql_password'


## Endpoints

- `GET /api/categories` - Retrieves all categories.
- `GET /api/categories/:id` - Retrieves a category by ID.
- `GET /api/products` - Retrieves all products.
- `GET /api/products/:id` - Retrieves a product by ID.
- `GET /api/tags` - Retrieves all product tags.
- `GET /api/tags/:id` - Retrives a product tag by ID.
- `POST /api/categories` - Creates a new category.
- `POST /api/products` - Creates a new product.
- `POST /api/tags` - Creates a new product tag.
- `PUT /api/categories/:id` - Updates a category by ID.
- `PUT /api/products/:id` - Updates a product by ID.
- `PUT /api/tags/:id` - Updates a product tag by ID.
- `DELETE /api/categories/:id` - Deletes a category by ID.
- `DELETE /api/products/:id` - Deletes a product by ID.
- `DELETE /api/tags:/id` - Deltes a product tag by ID.


## Contributing
<!-- Badges for contributors -->
![Contributors](https://img.shields.io/github/contributors/SideControlJS/e-commerce.svg)
To contribute to this project, please make a pull request or contact me.


## Questions

For any questions about the project, please send me an [email](mailto:twelvedust@outlook.com) and connect!

## License

This project is licensed under the [MIT license](LICENSE).

---

© 2023 Jesse Lare. All Rights Reserved.
