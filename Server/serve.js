const http = require('http');

// O endereço 0.0.0.0 expõe o servidor para a rede local
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Vai Corinthians.\n');
});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando e acessível na porta ${port}`);
});
