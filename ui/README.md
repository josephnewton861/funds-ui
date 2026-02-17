# Funds Dashboard Frontend

This project is a **React + TypeScript** frontend application for managing and displaying investment fund data. It communicates with a **NestJS backend API** to fetch, preload, and display funds, their documents, holdings, and portfolio assets.

**Important**
- Please spin up the back end of this applicaition before trying to run the front end. See https://github.com/josephnewton861/funds-be readme for more details.

---

## Technologies Used

- **React** – Modern UI library for building interactive web applications.  
- **TypeScript** – Type safety and better maintainability.  
- **Axios** – HTTP client for API requests to the backend.  
- **Jest / React Testing Library** – Unit and integration testing for components. 
- **Chart JS** – Chart visuals. 
- **Bootstrap** - Out of the box styling.

---

## Features

- Display a **list of funds** with key details (name, market code, price, ratings).  
- View **fund details**, including associated documents, top holdings, and portfolio assets.  

---

## Future Features

- Integrate an LLM that the user can prompt to compare more easilly the pros and cons of each available fund.  
- Create more user feautures such as searching and pagination as more funds become readly availible.

## API Endpoints Consumed

| Method | Route               | Purpose                                                      |
|--------|--------------------|--------------------------------------------------------------|
| GET    | `/funds`           | Fetch all funds for display.                                 |
| GET    | `/funds/:id`       | Fetch details for a single fund by ID.                      |

> Note: All API calls are made to the backend defined in `.env` (`VITE_BASE_URL`).  

---

## Environment Variables

Create a `.env` file in the project root with the following variable:  
  `VITE_BASE_URL="http://localhost:3000"`

**Getting Started** 

1. **Clone the repo**
  `git clone <repo-url>`
  `cd <repo-folder>`

2. `npm install` to install packages used

3. `npm run test` to run tests

4. `npm run dev` to run the application

