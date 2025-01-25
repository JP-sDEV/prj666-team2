# Week 4 Progress Report (Jan 18 - Jan 25)

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

- [x]  Linting ([ESLint](https://eslint.org/))
- [x]  Formatting ([Prettier](https://prettier.io/))

**Tests:**

- [x]  Unit ([Jest](https://jestjs.io/))
    - Ensure 80% code coverage
- [ ]  Integration ([Jest](https://jestjs.io/))
    - Ensure 80% code coverage
- [ ]  Unit ([React Testing Library](https://testing-library.com/docs/react-testing-library/intro/))
    - Ensure 80% code coverage
- [ ]  E2E, end to end, ([Cypress](https://www.cypress.io/))
    - Ensure 80% code coverage

**Integration Check (git):**

- [ ]  Check for merge conflicts

**Reporting:**

- [ ]  send teams message with test summary

### Backend CI Processes

**Static code analysis:**

- [x]  Linting (ESLint)
- [x]  Formatting (Prettier)

**Tests:**

- [x]  Unit (Jest)
    - Ensure 80% code coverage
- [ ]  Integration ([Supertest](https://www.npmjs.com/package/supertest))
    - Ensure 80 amount code coverage
- [ ]  Unit (React Testing Library)
    - Ensure 80% code coverage

**Integration Check (git):**

- [ ]  Check for merge conflicts

**Reporting:**

- [ ]  send teams message with test summary

### Raspberry Pi CI Processes

**Static code analysis:**

- [x]  Linting ([flake8](https://flake8.pycqa.org/))

Tests:

- [x]  Unit ([Pytest](https://pytest.org/))
- Ensure 80% of coverage
- [ ]  Integration (Pytest)
    - Ensure X% of coverage

---

## CD Infrastructure

The CD pipeline automates deployment to Vercel, the hosting platform, where the API and frontend will reside. The deployment will only execute if both backend, and frontend CI pipelines have passed. 

### CD processes:

- [x]  check if both frontend and backend processes passed:
    - [ ]  push to [Vercel](https://vercel.com/)