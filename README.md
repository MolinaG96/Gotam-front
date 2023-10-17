# Gotam-Frontend

Welcome to the gotam frontend documentation. This is an application whose objective is to manage employees, creating them, saving them with different properties, editing them as long as you are registered and logged in. At the end you will find the links to the front deploy and the docker image.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- **clone the repository on your computer**
- **run npm i to install all dependencies**
- **npm run dev to run the server**
- **If you have a backend you can create an .env where you should put something like this:**
 **NEXT_PUBLIC_API_URL=http://localhost:8080**

```bash
npm i
npm run dev
```

-You can also create a build to optimize the application

```bash
npm i
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Project Structure

```
Gotam-Front
|
|-- .husky # Git hooks made easy.
|
|-- public # Store static files like images, fonts, etc.
|
|-- src
| |-- app
| | |-- (pages) # All the main pages go here.
| | |-- commons # Generic components (buttons, inputs, etc)
| | |-- components # Reusable components (header, footer)
| | |-- hooks # a generic useState.
| | |-- interfaces # Data structures.
| | |-- services # Services for handling business logic.
| | |-- styles # Global styles, variables, themes.
| | |-- layout.tsx # Main layout component.
| | |-- page.tsx # Entry point of the app.
|
|-- .dockerignore # Lists files/directories that Docker should not copy into the container.
|
|-- .eslintrc.json # Defines the rules for the linter.
|
|-- .gitignore # Specifies files that Git should ignore.
|
|-- .lintstagedrc # Configuration for lint-staged, a tool that runs linters on staged git files.
|
|-- README.md # Provides an overview and documentation for the project.
|
|-- dockerfile # Contains Docker instructions for building a Docker image for the application.
|
|-- next.config.js # Configuration for Next.js.
|
|-- package-lock.json # Contains the exact version of installed npm dependencies in order to reproduce an identical dependency tree.
|
|-- package.json # Lists the package dependencies for the project. Also includes metadata about the project such as name, description, and version.
|
|-- postcss.config.js # Configuration for PostCSS, a tool for transforming CSS with JavaScript.
|
|-- tailwind.config.js # Configuration file for Tailwind CSS, a utility-first CSS framework.
|
|-- tsconfig.json # Contains the configurations and options for the TypeScript compiler.
```

## Dependencies: Languajes and tools

### Languajes:

-   **HTML**
-   **CSS**
-   **Tailwind CSS**
-   **TypeScript**

### Tools:

-   **Sweetalert2**
-   **React-Slick**
-   **Axios**
-   **ESLint**
-   **Husky**
-   **Prettier**

## Usage and Features

### Login

The "Login" component is responsible for handling user authentication. The user is presented with two text input fields for their email and password respectively, along with a "Login" button to submit these credentials. If the user does not have an account, they have the option to create one by clicking the "Create account" button which will navigate them to the signup page.

Props:
This component does not receive any props.

Actions:

Login: By clicking the "Login" button, the user can log in using their entered email and password.
Create account: By clicking the "Create account" button, the user can navigate to the sign-up page to create a new account.

### Signup

The signup page is responsible for creating a new user and requests the following information: name, email, password, and password verification. Additionally, it provides a link to the login page for users who already have an existing account.

### Employees-management

The "Employees-management" page shows all the employees who have registered in the app. You can find the information about each employee in their respective column. They are organized in a slider that allows you to slide to the side to see more and if you select one you can go to edit it. Additionally, in the all employees container there is a button that takes you to create a new employee.
Employees are obtained through areas that contain their respective employees

## Example Employee data from areas:

```
_id: '652e4ec082c16e5b99e83d05',
area: 'informatica',
employees: Employee[] = [
    {
        id: '652e4f1582c16e5b99e83d0b',
    },
    {
        id: '652e514e82c16e5b99e83d23',
    },
    //...
]
```

With those ids you can find the respective employees of that area in question.

### New-employee

The New-employee page is responsible for create a new employee and a new area. You cannot create an employee without an area or without any of the fields that an employee has

## Example Prop Data (EmployeeInfo):

```typescript
interface Employee {
    name: string
    dni: number
    birthday: string
    description: string
    developer: boolean
}
```

## Example Prop Data (AreaInfo):

```
const packages: IArea =
    {
        area: 'cocina',
    },
```

## Actions:

-   create new employee: By clicking the "create" button, the new employee's information is sent to the back.
-   create new area: By clicking the "create" button, the new area's information is sent to the back.

### Edit-employee

The edit employee shows the information of the employee that was clicked in the employee management component and the employee area.
You can edit all the properties of the employee, as well as delete it and also edit the areas and delete them

## Actions:

-   edit employee: By clicking the "edit" button, the new employee data is sent to the back
-   delete employee: By clicking the "trash" button, the employee in question is eliminated and removed from the area in which he was
-   edit area: By clicking the "edit" button, the new area name is sent to the back
-   delete area: By clicking the "trash" button, the area in question is eliminated only if it does not contain employees

### Links:

## docker

-   [image in docker hub](https://hub.docker.com/repository/docker/molinagonzalo96/gotam-front/general)

-or you can directly do a pull with this code:
docker pull molinagonzalo96/gotam-front:latest

## vercel

-   [deploy on vercel](https://gotam-front.vercel.app/)

Thank you for coming this far, I hope you like the application.
If you want to contact me you can do so by this email: molinagomezgonzalo@gmail.com
