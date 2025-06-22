FROM node:18-bullseye

# Install additional tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Install global npm packages
RUN npm install -g @11ty/eleventy nodemon

# Create non-root user
RUN useradd -m -s /bin/bash vscode
USER vscode