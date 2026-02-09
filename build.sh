NAME=$(jq .name< package.json)
NAME=${NAME//\"/}
VERSION=$(jq .version < package.json)
VERSION=${VERSION//\"/}
docker build . -t vscode-markdown-mermaid
docker create --name deleteme-vscode-markdown-mermaid vscode-markdown-mermaid 
docker cp deleteme-vscode-markdown-mermaid:/app/${NAME}-${VERSION}.vsix .
docker rm deleteme-vscode-markdown-mermaid
