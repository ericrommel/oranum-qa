# Pull official base image
ARG NODE_VERSION=14.15.4
FROM node:${NODE_VERSION} as base

#### Environment variables
# Work directory
ENV WORK_DIR=/qa

# Add `/node_modules/.bin` to $PATH
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

# ENV DEBUG=*

# set working directory
WORKDIR ${WORK_DIR}

# Install app dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# The node image seems to be based on debian which does not have the repository by default. Workaround to find the JRE
RUN echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list

# OpenJDK-11
RUN apt update && apt install -y openjdk-11-jre-headless && apt clean;

# GIT
RUN apt update && apt install -y git

# Get latest Chrome and install
RUN apt update && \
    apt install -y gnupg wget curl unzip --no-install-recommends && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
    apt update -y && \
    apt install -y google-chrome-stable && \
    CHROME_VERSION=$(google-chrome --product-version | grep -o "[^\.]*\.[^\.]*\.[^\.]*") && \
    DRIVER_VERSION=$(curl -s "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROME_VERSION") && \
    wget -q --continue -P /chromedriver "http://chromedriver.storage.googleapis.com/$DRIVER_VERSION/chromedriver_linux64.zip" && \
    unzip /chromedriver/chromedriver* -d /chromedriver

# Put Chromedriver into the PATH
ENV PATH $DRIVER_VERSION:$PATH

# Install dependencies and Build
RUN npm run build

FROM base as test
RUN npm ci
COPY . ./
