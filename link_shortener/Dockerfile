FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8082
CMD ["npm", "start"]
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
