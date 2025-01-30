# Use a lightweight Node.js image
FROM node:lts-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies with --legacy-peer-deps to resolve conflicts
RUN npm install --legacy-peer-deps

# Copy all project files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
