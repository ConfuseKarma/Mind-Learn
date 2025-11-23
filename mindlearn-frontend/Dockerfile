FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
# instala também devDependencies (inclui vite)
RUN npm ci

COPY . .

ARG VITE_API_BASE
ARG VITE_ADMIN_SECRET

RUN printf "VITE_API_BASE=%s\nVITE_ADMIN_SECRET=%s\n" "$VITE_API_BASE" "$VITE_ADMIN_SECRET" > .env.production \
  && npm run build

FROM nginx:1.27-alpine

# usa a config custom de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# build estático do Vite
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
