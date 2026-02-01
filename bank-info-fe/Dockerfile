FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the built application
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Serve the application
CMD ["serve", "-s", "build", "-l", "3000"]