# OmniBank AI Navigator

This is an advanced decision-support tool built with Next.js and Genkit, designed to help financial institutions like OmniBank make strategic, data-driven decisions about which AI pilot projects to pursue.

The application provides a guided workflow:
1.  **AI Landscape:** Understand the current AI market context.
2.  **Pilot Prioritizer:** Interactively model the financial impact and implementation risks of different AI strategies (e.g., a customer-facing bot vs. an internal-assist tool).
3.  **Risk Dashboard:** View a dynamically generated risk assessment tailored to the recommended pilot program based on your inputs.
4.  **The Verdict:** See a clear, final recommendation and a detailed implementation roadmap for the chosen strategic path.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or a compatible package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    This project uses `npm` to manage its dependencies. Run the following command to install them:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    The application uses Google's Generative AI models via Genkit. You will need an API key from Google AI Studio to run the AI-powered features.

    -   Create a new file named `.env` in the root of the project directory.
    -   Add your API key to the `.env` file like this:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    You can get your key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

This application consists of two main parts that need to run concurrently: the Next.js frontend and the Genkit AI flows backend.

1.  **Start the Next.js development server:**
    Open a terminal and run:
    ```bash
    npm run dev
    ```
    This will start the web application, typically on `http://localhost:9002`.

2.  **Start the Genkit development server:**
    Open a *second* terminal and run:
    ```bash
    npm run genkit:watch
    ```
    This command starts the Genkit flows and will automatically restart if you make any changes to the AI logic in the `src/ai/flows` directory.

Once both servers are running, you can access the application in your browser at the specified localhost address.
