#!/bin/bash

# Start FastAPI backend
echo "🔧 Starting FastAPI backend..."
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Start React frontend
echo "⚛️  Starting React frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait until user presses Ctrl+C
echo "✅ Both servers are running."
echo "🌐 Frontend: http://localhost:5173"
echo "🛠  Backend: http://127.0.0.1:8000/docs"
echo "⏹  Press Ctrl+C to stop."

# Trap Ctrl+C and kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID" SIGINT
wait

