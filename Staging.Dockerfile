# from base image node
FROM 540455772678.dkr.ecr.ap-south-1.amazonaws.com/node-14-17:latest
#FROM 540455772678.dkr.ecr.ap-south-1.amazonaws.com/node-12-8-3

ARG env

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY . .

# install all dependencies
RUN yarn install

RUN yarn build:$env

# copy oter files as well
#COPY ./dist .

#expose the port
EXPOSE 6007

# command to run when intantiate an image
CMD ["yarn","start", "--port", "6007"]

