FROM node:16

RUN apt-get update && apt-get install
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install -g @angular/cli@12.0.0
RUN npm install json-server --force
RUN npm install --force

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0

EXPOSE 4200
