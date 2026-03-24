# Todo App

A clean and modern task management application built with React and Vite. Stay organized by managing your daily tasks with an intuitive interface.

## ✨ Features

- **Add Tasks** - Create new tasks with optional descriptions
- **Task Descriptions** - Add short descriptions to tasks for more context
- **Mark Complete** - Check off tasks as you complete them
- **Filter Views** - Switch between viewing all, active, or completed tasks
- **Clear Completed** - Quickly remove all finished tasks
- **Persistent Storage** - Tasks are automatically saved to your browser's local storage
- **Active Task Count** - See at a glance how many tasks remain to be done
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Navigate to the project directory:
   ```bash
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the development server with hot-reload:

```bash
npm start
```

The application will be available at `http://localhost:5173` in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoFilter.jsx    - Filter button component (All/Active/Completed)
│   ├── TodoInput.jsx     - Input form for adding new tasks
│   ├── TodoItem.jsx      - Individual task item component
│   └── TodoList.jsx      - Container for displaying tasks
├── App.jsx               - Main application component
├── App.css               - Application styles
├── main.jsx              - React entry point
└── index.css             - Global styles
```

## 🎯 How to Use

1. **Add a Task**: Type in the input field and click "ADD" or press Enter
2. **Add Description**: Click the input field to reveal the description box, then add optional details
3. **Complete a Task**: Click the checkbox next to any task to mark it complete
4. **Filter Tasks**: Use the ACTIVE/COMPLETED buttons to view specific task lists
5. **Delete a Task**: Click the X button on any task to remove it
6. **Clear Completed**: Click "Clear completed" to remove all finished tasks at once

## 🛠 Technologies

- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **ESLint** - Code quality tool
- **CSS 3** - Styling with custom properties and responsive design

## 📝 Development Notes

- Tasks are stored in browser localStorage and persist across sessions
- The active task count in the header updates automatically
- Task IDs are generated using timestamps (`Date.now()`)
- Description input only appears when the form is focused for a cleaner UI

## 📄 License

See the LICENSE file in the root directory for licensing information.