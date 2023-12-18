FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ["package*.json", "./"]

RUN npm clean-install

# Bundle app source
COPY ["src/", "./src/"]
COPY ["tsconfig.json", "./"]
COPY ["tsconfig.build.json", "./"]
COPY ["nest-cli.json", "./"]

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run" , "start:prod" ]