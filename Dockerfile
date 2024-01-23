FROM node:18-alpine

WORKDIR /usr/apps/LD-Xplorer

# prepare frontend first
COPY frontend ./frontend
WORKDIR /usr/apps/LD-Xplorer/frontend
RUN npm install
RUN npm run build-for-backend

# prepare backend 
WORKDIR /usr/apps/LD-Xplorer
COPY backend/src/functions ./backend/src/functions
COPY backend/src/api.js ./backend/src
COPY backend/package-lock.json ./backend
COPY backend/package.json ./backend

WORKDIR /usr/apps/LD-Xplorer/backend
RUN npm install

CMD ["npm", "run", "prod"]