# Mermaid AI Editor

[![Vercel](https://vercel.com/button)](https://mermaid-ai-editor.vercel.app)

A modern, AI-powered editor for creating and editing Mermaid diagrams with Next.js and Gemini AI.

## Features

- **AI-Powered Diagram Generation**: Describe your diagram in natural language and let AI generate the Mermaid code
- **Real-time Preview**: See your diagrams update as you edit the code
- **Preset Templates**: Quick-start with common diagram types
- **Responsive Layout**: Adjustable panels for optimal workspace
- **Modern UI**: Built with shadcn/ui for a clean, accessible interface

## Getting Started

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Create a `.env` file with your Gemini API key (see `.env.sample`)
4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to start creating diagrams.

## AI Integration

This project uses Google's Gemini AI to generate Mermaid diagrams from natural language prompts. You'll need to:

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/)
2. Add it to your `.env` file as `GEMINI_API_KEY`

## Technology Stack

- Next.js 14 (App Router)
- React 18
- shadcn/ui
- Monaco Editor
- Mermaid.js
- Google Gemini AI

## Development

```sh
pnpm install
pnpm dev
```

## Deployment

The project is configured for easy deployment to Vercel or Netlify.

Live demo: [mermaid-ai-editor.vercel.app](https://mermaid-ai-editor.vercel.app)

## Contributing

Contributions are welcome! Please open issues or pull requests on GitHub.

## License

MIT
