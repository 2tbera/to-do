# Angular Project with API Backend

This is a full-stack web application built using Angular for the frontend and a backend implemented in TypeScript using `ts-node`. The project follows the BEM methodology for CSS architecture to maintain scalable and maintainable styles.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [CSS Architecture](#css-architecture)
- [API Overview](#api-overview)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Build](#build)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Frontend**: Angular with state management via NgRx
- **Backend**: TypeScript-powered API using `ts-node`
- Asynchronous actions handled via NgRx Effects
- Entity-based state management using NgRx Entity
- Material Design components with Angular Material
- RESTful API endpoints for backend communication
- Scalable CSS architecture using the BEM methodology

## Technologies Used

- **Frontend**:
  - Angular
  - NgRx, NgRx Effects, NgRx Entity
  - Angular Material
  - BEM methodology for CSS
- **Backend**:
  - TypeScript
  - `ts-node` for runtime execution of TypeScript
  - Express (optional, if using for API routing)

## CSS Architecture

This project uses the **BEM (Block Element Modifier)** methodology for organizing CSS. BEM promotes consistency and scalability by breaking styles into reusable blocks, elements, and modifiers.

### BEM Naming Convention

- **Block**: Represents a standalone entity.
  - Example: `card`
- **Element**: Represents a part of a block.
  - Example: `card__title`
- **Modifier**: Represents a different state or version of a block or element.
  - Example: `card--featured`, `card__title--highlighted`

### Example

```html
<div class="card card--featured">
  <h2 class="card__title card__title--highlighted">Featured Card</h2>
  <p class="card__content">This is the content of the card.</p>
</div>