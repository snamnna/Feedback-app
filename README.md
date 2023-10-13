# Feedback App

## Description

In the project, a Feedback application has been developed, through which students can provide feedback directly to the teacher about the lectures. Giving feedback is done anonymously, and the feedback is given after the lecture. The purpose of the application is to enable the teacher to improve their teaching and customize it for each teaching group, even during the course. By tailoring the instruction, students' learning outcomes also improve, as the teaching becomes more supportive of individual learning. The application has been designed to be simple, making it easy to provide feedback after each lecture.

## Table of Contents

- [Feedback App](#feedback-app)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Technologies](#technologies)
  - [Installation \& Setup](#installation--setup)
    - [Pre-requisites](#pre-requisites)
    - [Clone the Repository](#clone-the-repository)
    - [Server Setup](#server-setup)
    - [Client Setup](#client-setup)
    - [Running the Application](#running-the-application)
  - [Usage](#usage)
    - [All Users:](#all-users)
    - [For Teachers:](#for-teachers)
    - [For Students:](#for-students)
    - [For Admin:](#for-admin)
    - [Noteworthy:](#noteworthy)
    - [Screenshots](#screenshots)

## Project Structure

- `Client`: Frontend codebase of the application.
- `Server`: Backend codebase managing server-side operations.

## Technologies

- **React**: For building the user interface.
- **Redux**: State management for the application.
- **TailwindCSS**: Styling and responsive design.
- **Vite**: Build tool and development server.
- **Express**: Backend server framework.
- **Prisma**: ORM and database management.
- **PostgreSQL**: Database for storing application data.
- **GitHub Actions**: CI/CD pipeline for the application.

## Installation & Setup

### Pre-requisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [PostgreSQL Server](https://www.postgresql.org/download/)

### Clone the Repository

```bash
git clone https://github.com/snamnna/Feedback-app feedback-app
cd feedback-app
```

### Server Setup

1. Navigate to `./server`.
2. Create a `.env` file with your PostgreSQL details:

```bash
DATABASE_URL=postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

3. Install server dependencies:

```bash
npm install
```

### Client Setup

1. Navigate to `./Client`.
2. Install client dependencies:

```bash
npm install
```

### Running the Application

To start the server:

```bash
cd server
npm start
```

To start the client:

```bash
cd Client
npm run dev
```

Visit `localhost` in your browser to access the FeedbackApp.

## Usage

The following functionalities have been implemented in the project

### All Users:

- **Logging in**
- **Registration**
- **Updating user information**

### For Teachers:

- **Accepting students** into a course.
- **Adding new lectures** to a course.
- Generating **reports as a percentage** from a single lecture.
- Generating **feedback reports as a percentage** from a whole course.

### For Students:

- **Enrollment** to a course (requires teacher's permission).
- **Feedback provision** using buttons and an optional text field (up to 160 characters).

### For Admin:

- **Assign user permissions/make a user a teacher**.

### Noteworthy:

The following functionality has not yet been implemented:

- Feedback reports from a single student from different teachers' courses.

In addition to the listed functionalities, there are issues with course and lesson management, specifically in terms of deletion, which are not working perfectly.

### Screenshots

![Login](./documents/images/login.jpg)

**Picture 1. Login**

- Registration and login options are positioned in the center of the window.
- All users have "user settings" and "logout" options in the top right corner.

![Teacher's View](./documents/images/tview.png)

**Picture 2. Teacher’s view**

- For teachers, a button for creating a new course is located on the left side of the main dashboard.
- On the right side, there is a search bar in the navigation menu for searching all courses.
- The dashboard displays all the courses created by the teacher.
- On the course page, the course and lessons can be managed, and it provides access to view the feedback given for lessons.

![Student's View](./documents/images/sview.png)

**Picture 3. Student’s view**

- For students, the page has no "create course" -button. Otherwise the page is identical to the one for the teachers.
- The dashboard displays all the courses the student is joined in.
- The student can give feedback to a lecture by clicking the course open.
