# AI Document Generator

An AI-powered document generation system that creates professional, implementation-ready documents based on various frameworks and industry standards.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose
- PostgreSQL (if not using Docker)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd create-any-doc
```

### 2. Set up the database
```bash
# Start PostgreSQL using Docker
docker-compose up -d
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start the development server
npm run start:dev
```

### 4. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://username:password@localhost:5432/document_generator?schema=public"
OPENAI_API_KEY="your_openai_api_key_here"
DEEPSEEK_API_KEY="your_deepseek_api_key_here"
PORT=3001
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001
```

## Features

- Document generation based on various frameworks (GDPR, ISO 27001, HIPAA, etc.)
- Industry-specific customization
- Quality validation and scoring
- Implementation guides
- Smart question generation
- Document preview and download

## Tech Stack

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- OpenAI API
- TypeScript

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- Lucide React Icons

## Development

The application runs on:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Database: localhost:5432

## License

MIT
