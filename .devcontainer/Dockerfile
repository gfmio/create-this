# ARG VARIANT="17.8-slim"
ARG VARIANT="17.8-bullseye-slim"

FROM node:${VARIANT}

ENV DEBIAN_FRONTEND noninteractive

ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

# Install packages
RUN apt-get update && apt-get -y install --no-install-recommends zsh curl git sudo ca-certificates

# Set the root password
RUN echo "root:root" | chpasswd

# Add the non-root user
RUN adduser vscode --shell /bin/zsh
RUN adduser vscode sudo
RUN echo "vscode:vscode" | chpasswd

# Install Oh My Zsh for the user
RUN su vscode -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

USER vscode
