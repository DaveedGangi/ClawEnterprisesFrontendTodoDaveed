
### Note 

backend git hub url :https://github.com/DaveedGangi/ClawEnterprisesBackendTodoDaveed.git
frontend git hub url: https://github.com/DaveedGangi/ClawEnterprisesFrontendTodoDaveed.git

hoisted todo app: https://todoappdaveed.netlify.app/

### login and register 

## Packages Used

1. **React**
   - Used for building the user interface. Specifically, the `Component` class from React is utilized to create a stateful component.
   - JSX syntax is used to define the structure of the UI.

2. **js-cookie**
   - A library for handling cookies. It is used here to set a JWT token after successful user login.

3. **CSS**
   - Custom CSS is imported and used for styling the components.

## Concepts Used

1. **React Class Components**
   - The `Login` component is a class component that extends `React.Component`.
   - State management and lifecycle methods are used to manage user interactions and API calls.

2. **State Management**
   - The component’s state (`this.state`) is used to store form data, error messages, and the current form view (login or register).

3. **Event Handling**
   - Custom methods are defined and used as event handlers for managing user input and form submissions.

4. **Conditional Rendering**
   - The component conditionally renders the login or registration form based on the value of the `register` state.

5. **Form Validation**
   - Basic validation checks for empty fields and password match before form submission.

6. **API Calls**
   - The `fetch` API is used to make asynchronous POST requests to the backend for login and registration.
   - Responses are parsed and used to update the component state and UI accordingly.

7. **LocalStorage and Cookies**
   - User information is stored in `localStorage` and the JWT token in cookies after a successful login for session management.

8. **Routing**
   - Navigation to different pages is handled using `this.props.history.push("/")` (Requires the component to be wrapped with a router, e.g., `withRouter`).


### HOME

## Packages Used

1. **React**
   - Utilized for building the user interface. Specifically, the `Component` class from React is used to create a stateful component.
   - JSX syntax is used to define the structure of the UI.
   - `react-router-dom` is used for routing within the application.

2. **js-cookie**
   - A library for handling cookies, used to check the presence of a JWT token for user authentication.

3. **react-bootstrap**
   - Used for UI components like `Offcanvas` to create a responsive navigation drawer.

4. **React Icons**
   - Icons from `react-icons` are used for better visual representation of the UI.

5. **CSS**
   - Custom CSS is imported and used for styling the components.

## Concepts Used

1. **React Class Components**
   - The `Home` component is a class component that extends `React.Component`.
   - State management and lifecycle methods are used to manage user interactions and API calls.

2. **State Management**
   - The component’s state (`this.state`) is used to store todos, form data, search input, and visibility states for different sections.

3. **Event Handling**
   - Custom methods are defined and used as event handlers for managing user input, form submissions, and other interactions.

4. **Lifecycle Methods**
   - `componentDidMount` is used to fetch all todos when the component mounts.

5. **Conditional Rendering**
   - The component conditionally renders different views based on the state (e.g., displaying all todos, the add todo form, and the edit todo form).

6. **Form Handling**
   - Forms are used to add and update todos with controlled components. Form data is managed via component state.

7. **API Calls**
   - The `fetch` API is used to make asynchronous GET, POST, PUT, and DELETE requests to the backend for managing todos.

8. **LocalStorage and Cookies**
   - User data is stored in `localStorage` and the presence of a JWT token in cookies is checked for authentication.

9. **Routing**
   - The `Redirect` component from `react-router-dom` is used to navigate to the login page if the JWT token is not present.
   - The `Link` component from `react-router-dom` is used for navigation to the profile page.


### profile 

## Packages Used

1. **React**
   - Utilized for building the user interface. Specifically, the `Component` class from React is used to create a stateful component.
   - JSX syntax is used to define the structure of the UI.
   - `react-router-dom` is used for routing within the application.

2. **js-cookie**
   - A library for handling cookies, used to check the presence of a JWT token for user authentication and to manage user logout.

## Concepts Used

1. **React Class Components**
   - The `Profile` component is a class component that extends `React.Component`.
   - State management and lifecycle methods are used to manage user interactions and API calls.

2. **State Management**
   - The component’s state (`this.state`) is used to store session data.

3. **Event Handling**
   - Custom methods are defined and used as event handlers for managing user input and API calls.

4. **Lifecycle Methods**
   - `componentDidMount` is used to fetch all session data when the component mounts.

5. **Conditional Rendering**
   - The component conditionally renders session data or a message when no sessions are found.

6. **API Calls**
   - The `fetch` API is used to make asynchronous GET and POST requests to the backend for fetching session data and logging out the user.

7. **LocalStorage and Cookies**
   - User data is stored in `localStorage` and the presence of a JWT token in cookies is checked for authentication.
   - `localStorage` is also used to manage the user’s login time and other session-related data.

8. **Routing**
   - The `Redirect` component from `react-router-dom` is used to navigate to the login page if the JWT token is not present.
   - The `Link` component from `react-router-dom` is used for navigation back to the home page.





Sure, here's a section for your README.md file outlining the important points of your backend code:

---

## Backend Overview

### Technologies Used
- **Express**: Web framework for Node.js to build the server.
- **SQLite**: Lightweight database for storing user and todo information.
- **CORS**: Middleware to allow cross-origin requests.
- **bcrypt**: Library for hashing passwords to ensure secure storage.
- **jsonwebtoken (JWT)**: Used for creating and verifying tokens for user authentication.

### Database Schema
1. **Users Table**:
   - `id`: Integer, Primary Key, Auto Increment.
   - `username`: Text, Unique.
   - `password`: Text, Hashed password.

2. **Todos Table**:
   - `id`: Integer, Primary Key, Auto Increment.
   - `title`: Text.
   - `description`: Text.
   - `user_id`: Integer, Foreign Key referencing `users.id`.

3. **Sessions Table**:
   - `id`: Integer, Primary Key, Auto Increment.
   - `user_id`: Integer, Foreign Key referencing `users.id`.
   - `login_time`: Text.
   - `logout_time`: Text.

### API Endpoints

1. **User Registration**
   - **Endpoint**: `/register`
   - **Method**: POST
   - **Description**: Registers a new user with a unique username and hashed password.
   - **Request Body**: `{ "username": "user", "password": "pass" }`
   - **Response**: `{"errorMessage": "user created successfully"}` or `{"errorMessage": "user already exists"}`

2. **User Login**
   - **Endpoint**: `/login`
   - **Method**: POST
   - **Description**: Authenticates a user and returns a JWT token if successful.
   - **Request Body**: `{ "username": "user", "password": "pass" }`
   - **Response**: `{ "jwtToken": "token", "username": "user", "id": user_id }` or `{"errorMessage": "Invalid user"}`

3. **Create Todo**
   - **Endpoint**: `/todos`
   - **Method**: POST
   - **Description**: Creates a new todo item for a user.
   - **Request Body**: `{ "title": "title", "description": "desc", "user_id": user_id }`
   - **Response**: `{"errorMessage": "todo created successfully"}`

4. **Get Todos for User**
   - **Endpoint**: `/todos/:id`
   - **Method**: GET
   - **Description**: Retrieves all todos for a specific user.
   - **Response**: List of todos.

5. **Get All Todos**
   - **Endpoint**: `/getAllTodos`
   - **Method**: GET
   - **Description**: Retrieves all todos from the database.
   - **Response**: List of all todos.

6. **Update Todo**
   - **Endpoint**: `/todos/:id`
   - **Method**: PUT
   - **Description**: Updates a todo item by its ID.
   - **Request Body**: `{ "title": "new title", "description": "new desc" }`
   - **Response**: `{"errorMessage": "todo updated successfully"}`

7. **Delete Todo**
   - **Endpoint**: `/todos/:id`
   - **Method**: DELETE
   - **Description**: Deletes a todo item by its ID.
   - **Response**: `{"errorMessage": "todo deleted successfully"}`

8. **Get All User Sessions**
   - **Endpoint**: `/sessions`
   - **Method**: GET
   - **Description**: Retrieves all login sessions.
   - **Response**: List of all sessions.

9. **Log User Session**
   - **Endpoint**: `/loginSession`
   - **Method**: POST
   - **Description**: Logs a user's session with login and logout times.
   - **Request Body**: `{ "user_id": user_id, "login_time": "time", "logout_time": "time" }`
   - **Response**: `{"errorMessage": "session created successfully"}`

### Server Initialization
- The server is initialized by connecting to the SQLite database and setting up the tables if they don't already exist.
- **Port**: The server runs on `http://localhost:3000`.

---

### Lottie for animation

Lottie Animations
Lottie is a powerful library for rendering animations on the web and mobile. It provides a way to use animations created in Adobe After Effects and exported as JSON files using the Bodymovin plugin. These animations are rendered natively across multiple platforms, ensuring smooth and high-quality animations.













































































# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
