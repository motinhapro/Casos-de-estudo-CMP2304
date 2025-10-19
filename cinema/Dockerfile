# 1. Imagem base do alpine
FROM nginx:alpine

# 2. O diretório padrão de documentos do Nginx
WORKDIR /usr/share/nginx/html

# 3. Removemos o index.html padrão do nginx para não conflitar
RUN rm -rf ./*

# 3. Copia TODO o conteúdo da pasta atual (a subpasta da tarefa)
COPY . /usr/share/nginx/html/

# 4. Porta padrão
EXPOSE 80