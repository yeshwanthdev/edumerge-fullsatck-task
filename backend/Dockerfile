FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of app
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "src/server.js"]
