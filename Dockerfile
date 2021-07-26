FROM node:stretch-slim
RUN mkdir -p /app
WORKDIR  /app
COPY . /app
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]