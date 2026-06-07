# Bookmarks Angular

A modern bookmark management application built with Angular. Organize, search, and manage your web bookmarks with ease.

## Overview

Bookmarks Angular is a fully-featured bookmark manager that allows you to save, organize, edit, and delete web bookmarks. The application uses a local JSON database powered by json-server, with state management through NgRx for a seamless user experience.

## Technologies

- **Angular 21+**: Modern standalone components with signals and reactive patterns
- **Material Design**: Angular Material components for a polished UI
- **NgRx**: Predictable state management for bookmark data and search queries
- **TypeScript**: Strict type safety throughout the application
- **json-server**: Mock API backend with persistent JSON database
- **Vitest**: Fast unit testing framework

## Features & Capabilities

- **Add Bookmarks**: Create new bookmarks with title and URL
- **Edit Bookmarks**: Modify existing bookmark details
- **Delete Bookmarks**: Remove bookmarks from your collection
- **Search & Filter**: Fuzzy search across all bookmarks (filters by title and URL)
- **Auto-reset Search**: Search clears automatically when you delete the query
- **Date-based Grouping**: Bookmarks organized into Today, Yesterday, and Older sections
- **Persistent Storage**: All bookmarks saved to local database via json-server
- **Responsive UI**: Material Design components for a modern interface
- **Error Handling**: User-friendly snackbar notifications for all actions

## Getting Started

### Start the Database

Before running the application, start the json-server backend:

```bash
npm run startdb
```

The API will be available at `http://localhost:3000`.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Style Linting

To run lint checking on style run:

```
npm run lint:styles
```

To watch changes on style files an do linting on change run 

```
npm run lint:styles:watch
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.
