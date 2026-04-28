# Hari Krishna's Portfolio

A professional, dynamic, and responsive personal portfolio built with React and Vite. This portfolio showcases my experience, projects, and certifications as an AI/ML Engineer and Data Scientist.

## Features

- **Modern Architecture**: Built on React and Vite for lightning-fast performance and seamless component-based UI.
- **AI Chatbot**: Integrated a highly responsive, custom AI Chatbot powered by the Groq SDK to interact with visitors in real time.
- **Secure Contact Form**: Direct messaging capabilities securely routed via EmailJS without exposing backend credentials.
- **Comprehensive Sections**:
  - **About**: An introduction to my journey and core skills.
  - **Resume & Experience**: A detailed breakdown of my professional background and educational milestones.
  - **Portfolio**: A showcase of my latest AI/ML projects and Agentic AI applications.
  - **Certifications**: Industry-recognized accomplishments and continuous learning credentials.
- **Fully Responsive**: Designed with mobile-first principles ensuring a seamless experience across desktop, tablet, and mobile interfaces.
- **Automated Deployment**: Configured with GitHub Actions for continuous integration and automated deployment to GitHub Pages.

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with custom modern typography and dynamic variables
- **Services**: EmailJS (Contact Form), Groq SDK (AI Chatbot)
- **Deployment**: GitHub Actions / GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure Environment Variables:
   Create a `.env.local` file based on `.env.example` and add your keys:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Build for Production

To build the project for production, run:
```bash
npm run build
```

## Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the latest version to GitHub Pages on every push to the `main` branch. Ensure you have configured your GitHub Pages settings to serve from GitHub Actions.

## License

This project is licensed under the MIT License.
