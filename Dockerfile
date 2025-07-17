FROM node:22-alpine3.21 AS builder

RUN mkdir /app

# Set the working directory
RUN npm install -g npm@11.1.0

COPY ./package.json /app
COPY ./package-lock.json /app

WORKDIR /app

# Copy package.json and install dependencies

RUN npm install

# Copy all files and build the Angular SSR app
COPY . .

RUN npm run build -- --output-path=dist/fr-smartlink --configuration production

# Use a minimal Node.js image to run the SSR server
FROM node:22-alpine3.21
# Set the working directory
WORKDIR /app
# Copy the built app from the builder stage
COPY --from=builder /app/dist/fr-smartlink /app/dist
COPY --from=builder /app/package.json /app
COPY --from=builder /app/package-lock.json /app
# Install serve to serve the SSR app
RUN npm install -g serve
# Expose the SSR server port
EXPOSE 4000
# Command to run the SSR server
CMD ["node", "/app/dist/server/server.mjs"]
