FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Instala apenas deps de produção
COPY package*.json ./
RUN npm ci --omit=dev

# Copia o restante do código
COPY . .

# Cria usuário não root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD ["npm", "start"]
