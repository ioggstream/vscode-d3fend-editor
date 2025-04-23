# Use the same node version of mermaid.
FROM node:20.11.0-alpine3.19

RUN npm install -g @vscode/vsce

COPY . /app
WORKDIR /app
RUN npm install
RUN vsce package

