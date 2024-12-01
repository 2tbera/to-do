# Angular Project with API Backend

This is a full-stack web application built using Angular for the frontend and a backend implemented in TypeScript using `ts-node`. The project follows the BEM methodology for CSS architecture to maintain scalable and maintainable styles.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [CSS Architecture](#css-architecture)
- [Project Directory Structure](#project-directory-structure)

## Features

- **Frontend**: Angular with state management via NgRx
- **Backend**: TypeScript-powered API using `ts-node`
- Asynchronous actions handled via NgRx Effects
- Entity-based state management using NgRx Entity
- Material Design components with Angular Material
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

## CSS Architecture

This project uses the **BEM (Block Element Modifier)** methodology for organizing CSS. BEM promotes consistency and scalability by breaking styles into reusable blocks, elements, and modifiers.

### BEM Naming Convention

- **Block**: Represents a standalone entity.
  - Example: `card`
- **Element**: Represents a part of a block.
  - Example: `card__title`
- **Modifier**: Represents a different state or version of a block or element.
  - Example: `card--featured`, `card__title--highlighted`
  
```html
<div class="card card--featured">
  <h2 class="card__title card__title--highlighted">Featured Card</h2>
  <p class="card__content">This is the content of the card.</p>
</div>
```

### Project Directory Structure

Below is the directory structure of the project. It follows a modular and scalable design, with separate folders for core modules, features, shared components, and state management.


```plaintext

.
├── server
│   └── server.tsconfig.json
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── components
│   │   ├── core
│   │   │   ├── api
│   │   │   │   ├── http
│   │   │   │   │   └── # API services for HTTP layer
│   │   │   │   └── # All Http related files
│   │   │   ├── class
│   │   │   │   └── # Shared classes (base classes for global use)
│   │   │   ├── enums
│   │   │   │   └── # Enum definitions
│   │   │   ├── models
│   │   │   │   └── # Data models
│   │   │   └── services
│   │   │       └── # Global root level Service 
│   │   ├── features
│   │   │   └──  <feature / group>
│   │   │       ├── store
│   │   │       │   ├── actions
│   │   │       │   │   └──  # Feature related actions
│   │   │       │   ├── effects
│   │   │       │   │   └── # Feature related effects
│   │   │       │   ├── reducer
│   │   │       │   │   └── # Feature reducers
│   │   │       │   └── selectors
│   │   │       │       └── # Feature related selectors
│   │   │       └── # Feature module
│   │   ├── routes
│   │   │   ├── app-routing.module.ts
│   │   │   └── # Route configurations / routes
│   │   ├── shared
│   │   │   ├── components
│   │   │   │   └── # Shared components
│   │   │   └── # Shared ( Components / Pipes / Directives ... )
│   │   └── store
│   │       └── # Root level State
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── tsconfig.json
├── README.md
├── angular.json
└── package.json
```
