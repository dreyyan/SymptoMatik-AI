# SymptoMatik-AI
_AI-Powered Symptom Ranking and Diagnostic Assistant for Healthcare Professionals_

**SymptoMatik-AI** is a TypeScript-based web application built with React and Vite, designed to assist healthcare professionals in symptom ranking and disease diagnosis. Featuring an interactive node-based interface, users can drag and drop nodes to input symptoms, dynamically updating suggested diseases with relevant information. This tool aims to streamline preliminary diagnostics by leveraging AI-driven insights, making it valuable for medical professionals and educational purposes.

The primary purpose of SymptoMatik-AI is to provide an intuitive, AI-powered platform for symptom-based disease prediction, enhancing decision-making in healthcare settings through a modern, interactive UI.

## FEATURES
✅ **Interactive Node Interface** – Drag and drop nodes to input symptoms and visualize diagnostic relationships.  
✅ **AI-Driven Diagnostics** – Rank and suggest possible diseases based on symptom input using machine learning models.  
✅ **Dynamic Updates** – Real-time disease suggestion updates as nodes are manipulated.  
✅ **TypeScript & React** – Robust, type-safe frontend with fast development via Vite.  

## FUTURE IMPLEMENTATIONS
🚀 **Advanced AI Models** – Integrate gradient boosting or neural networks for improved diagnostic accuracy.  
🚀 **Patient Data Integration** – Support for linking patient records to enhance predictions.  
🚀 **Exportable Reports** – Generate diagnostic reports for sharing or documentation.  
🚀 **Mobile Support** – Optimize for mobile devices with responsive design.  

## UPDATES
🔄 Initial setup with React, TypeScript, and Vite for fast development.  
🔄 Node-based UI for symptom input and disease ranking implemented.  
🔄 Ongoing enhancements to AI model integration and UI interactivity.  

## PROJECT DETAILS
📌 **Author:** dreyyan  
📌 **Started:**  
📌 **Finished:**  

## TECH STACK
🛠️ **Language:** TypeScript  
🛠️ **Framework:** React, Vite  
🛠️ **Libraries:** ESLint (with react-x, react-dom plugins)  

## INSTALLATION
### Prerequisites
- Node.js 18 or higher
- Create a development environment:
  ```
  npm install
  ```

### Install Dependencies
Clone the repository and install dependencies:
```
git clone https://github.com/dreyyan/symptomatik-ai.git
cd symptomatik-ai
npm install
```

### Verify Installation
Check Node.js version:
```
node --version
```

## USAGE
### Running the Application
Start the development server:
```
npm run dev
```
Open the app in your browser (typically at `http://localhost:5173`).

### Example Workflow
1. **Launch the App**: Run `npm run dev` to start the Vite server.
2. **Interact with Nodes**: Drag and drop nodes in the UI to input symptoms.
3. **View Diagnostics**: Observe real-time updates to suggested diseases and related information.
4. **Refine Inputs**: Adjust node positions to refine symptom combinations and predictions.

### Configuration
- Configure ESLint for type-aware linting in `eslint.config.js` (see README for details).
- Update `tsconfig.node.json` and `tsconfig.app.json` for project-specific TypeScript settings.
- Ensure a modern browser for optimal rendering of the node-based interface.

## DEBUGGING
For issues, check the browser console or terminal output for Vite and React-related errors. Run with:
```
npm run dev
```
Report issues via GitHub Issues for detailed troubleshooting.

## PROJECT STRUCTURE
- `src/`: Main directory for React components and TypeScript code.
- `eslint.config.js`: ESLint configuration for type-aware linting.
- `tsconfig.node.json`, `tsconfig.app.json`: TypeScript configuration files.
- Other files include Vite configuration and standard React setup.