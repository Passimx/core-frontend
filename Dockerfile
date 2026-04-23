# Stage 1: base
FROM node:22.21.1-alpine AS base
WORKDIR /app
RUN npm install -g npm@10.4.0

# Stage 2: dependencies
FROM base AS dependencies
WORKDIR /app
COPY ./package.json package-lock.json ./
RUN npm ci

# Stage 3: build
FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

ARG VITE_API_URL
ARG VERSION
ARG ENVIRONMENT

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_VERSION=${VERSION}
ENV VITE_ENVIRONMENT=${ENVIRONMENT}

# Build project
RUN npm run build

# Clear dev dependecies
RUN npm config set ignore-scripts true
RUN npm prune --omit=dev

# Stage 4: final (nginx)
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 2223
CMD ["nginx", "-g", "daemon off;"]