FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY ./src/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY ./src .

# Generate Prisma client
RUN npm run db:generate

# Build the application
RUN npm run build

# Start the application in production mode
CMD [ "node", "dist/src/main.js" ]
