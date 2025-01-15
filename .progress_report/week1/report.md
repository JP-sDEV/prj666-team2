# Week 1 Progress Report (Jan 12 - Jan 18)

## Sprint 1

### Summary:

The main focus sprint 1 is to setup the following infrastructure: 

- development environment
- continuous integration
- continuous development

Establishing these processes standardizes the team’s code quality to the highest of our ability and ensures adherence to the SRS.

---

## CI Infrastructure:

Each stack in the project will have a dedicated CI pipeline to ensure code quality via unit tests, integration tests, and lint tests. 

### Frontend CI Processes:

**Stack Code Linting:** 

- [ ]  Linting ([ESLint](https://eslint.org/))
- [ ]  Formatting ([Prettier](https://prettier.io/))

**Tests:**

- [ ]  Unit ([Jest](https://jestjs.io/))
    - Ensure 80 amount of code coverage
- [ ]  Integration ([Jest](https://jestjs.io/))
    - Ensure 80 amount of code coverage
- [ ]  Unit ([React Testing Library](https://testing-library.com/docs/react-testing-library/intro/))
    - Ensure 80 amount of code coverage
- [ ]  E2E, end to end, ([Cypress](https://www.cypress.io/))
    - Ensure 80 amount of code coverage

**Integration Check (git):**

- [ ]  Check for merge conflicts

**Reporting:**

- [ ]  send teams message with test summary

### Backend CI Processes

**Static code analysis:**

- [ ]  Linting (ESLint)
- [ ]  Formatting (Prettier)

**Tests:**

- [ ]  Unit (Jest)
    - Ensure 80 amount of code coverage
- [ ]  Integration ([Supertest](https://www.npmjs.com/package/supertest))
    - Ensure 80 amount of code coverage
- [ ]  Unit (React Testing Library)
    - Ensure 80 amount of code coverage

**Integration Check (git):**

- [ ]  Check for merge conflicts

**Reporting:**

- [ ]  send teams message with test summary

### Raspberry Pi CI Processes

**Static code analysis:**

- [ ]  Linting ([flake8](https://flake8.pycqa.org/))

Tests:

- [ ]  Unit ([Pytest](https://pytest.org/))
- Ensure X amount of coverage
- [ ]  Integration (Pytest)
    - Ensure X amount of coverage

---

## CD Infrastructure

The CD pipeline automates deployment to Vercel, the hosting platform, where the API and frontend will reside. The deployment will only execute if both backend, and frontend CI pipelines have passed. 

### CD processes:

- [ ]  check if both frontend and backend processes passed:
    - [ ]  push to [Vercel](https://vercel.com/)