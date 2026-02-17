# Funds Dashboard Frontend

This project is a **React + TypeScript** frontend application for managing and displaying investment fund data. It communicates with a **NestJS backend API** to fetch, preload, and display funds, their documents, holdings, and portfolio assets.

**Important**
- Please ensure the back end of this applicaition is running before trying to run the front end. See https://github.com/josephnewton861/funds-be readme for more details.

---

## Technologies Used

- **React** – Modern UI library for building interactive web applications.  
- **TypeScript** – Type safety and better maintainability.  
- **Caching** - Performance of repeated requests 
- **Axios** – HTTP client for API requests to the backend.  
- **Jest / React Testing Library** – Unit and integration testing for components. 
- **Chart JS** – Chart visuals. 
- **Bootstrap** - Out of the box styling.
- **Caching** - Performance of repeated requests 

---

## Features

- Display a **list of funds** with key details (name, market code, price, ratings).  
- View **fund details**, including associated documents, top holdings, and portfolio assets.  

---

## Future Features

- Integrate an **LLM** that the user can prompt to compare more easilly the pros and cons of each available fund.  
- Create more user feautures such as searching and pagination as more funds become readly availible.

## API Endpoints Consumed

| Method | Route               | Purpose                                                      |
|--------|--------------------|--------------------------------------------------------------|
| GET    | `/funds`           | Fetch all funds for display.                                 |
| GET    | `/funds/:id`       | Fetch details for a single fund by ID.   
| GET    | `/bananas`         | Takes you to a custom error page producing a 404 error.                    |

> Note: All API calls are made to the backend defined in `.env` (`VITE_BASE_URL`).  

---

**Getting Started** 

1. **Clone the repo**
  `git clone <repo-url>`
  `cd <repo-folder>`

2. Create a `.env` file in the project root with the following variable:  
  `VITE_BASE_URL="http://localhost:3000"`

3. `npm install` to install packages used

4. `npm run test` to run tests

5. `npm run dev` to run the application

