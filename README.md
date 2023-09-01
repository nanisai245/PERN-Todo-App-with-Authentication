# PERN Todo APP with Authentication 🔐	

This is a Todo App with authentication which is implemented using a PERN technologies (PostgreSQL, Express.js, React.js, Node.js). The application allows users to create, manage, and track their todos while providing user authentication to secure the application.

## Features

- **User signup**: Users can create an account by providing a unique username and password.
- **User login**: Registered users can log in to the application using their credentials.
- **Todo creation**: Users can create new todos by providing a title and description.
- **Todo listing**: Users can view a list of all their todos along with their status.
- **Todo updating**: Users can update the title, description, and status of existing todos.
- **Todo deletion**: Users can delete unwanted todos.
- **User logout**: Logged-in users can log out from the application.

## Technologies Used

The PERN Todo App with Authentication is built using the following technologies:

- **PostgreSQL**: A powerful open-source relational database management system used to store user and todo data.
- **Express.js**: A flexible and minimal web application framework for Node.js used to build the server-side application and RESTful APIs.
- **Node.js**: A JavaScript runtime environment used to execute server-side code for the application.
- **React.js**: A JavaScript library for building user interfaces used to create an interactive and responsive client-side application.
- **bcrypt**: A library used for hashing and salting user passwords for secure storage.
- **jsonwebtoken**: A library used for generating and verifying JSON web tokens (JWTs) for user authentication.
- **react-coookie**: A library used for storing user data.
  
## Installation

To run the PERN Todo App with Authentication locally, follow these steps:

1. Clone the repository:
      git clone https://github.com/melos-simeneh/PERN-Todo-App-with-Authentication.git
2. Navigate to the project directory:
   cd pern-todo-auth
3. Install the server-side dependencies:
    cd server
    npm install
4. Install the client-side dependencies:
    cd client
    npm install
5. Start the server
 npm run server
7. Start the client
  npm run server
8. Access the application by visiting http://localhost:3000 in your web browser.

## API Endpoints

The server-side application provides the following RESTful API endpoints:

- POST **/api/auth/signup**: Register a new user.
- POST **/api/auth/login**: Log in an existing user.
- GET **/api/todos/users/:id**: Get all todos for the logged-in user.
- GET **/api/todos**: Get all todos 
- POST **/api/todos**: Create a new todo.
- PUT **/api/todos/:id**: Update an existing todo.
- DELETE **/api/todos/:id**: Delete a todo.

## Contributing

Contributions to the project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the project repository.
When contributing, please ensure to follow the existing code style and conventions and provide clear commit messages.

## Thank You

Thank you for taking the time to explore the Todo app. I hope it provides you with valuable insights into my skills and experiences as a software developer.

