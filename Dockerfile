# Use the same node version of mermaid.
FROM node:20.11.0-alpine3.19

COPY . /app
WORKDIR /app
RUN npm install -g @vscode/vsce
RUN npm install
RUN vsce package

