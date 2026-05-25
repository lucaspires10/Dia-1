const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  // Dizemos ao navegador que vamos enviar HTML com acentuação
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // 1. ROTA PRINCIPAL: Exibe o formulário quando a pessoa acessa a página
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end(`
      <div style="font-family: Arial, sans-serif; max-width: 300px; margin: 50px auto;">
        <h2>Cadastro Simples</h2>
        <form action="/salvar" method="POST">
          <label>Nome:</label><br>
          <input type="text" name="nome" required style="width: 100%; margin-bottom: 15px;"><br>
         
          <label>E-mail:</label><br>
          <input type="email" name="email" required style="width: 100%; margin-bottom: 15px;"><br>
          <label>Cidade:</label><br>
          <input type="cidade" name="cidade" required style="width: 100%; margin-bottom: 15px;"><br>         
          <button type="submit" style="width: 100%; padding: 10px;">Cadastrar</button>
        </form>
      </div>
    `);
  }
 
  // 2. ROTA DE CADASTRO: Processa os dados quando a pessoa clica em "Cadastrar"
  else if (req.method === 'POST' && req.url === '/salvar') {
    let corpoDaRequisicao = '';

    // Recebe os dados do formulário em pedaços (chunks)
    req.on('data', pedaco => {
      corpoDaRequisicao += pedaco.toString();
    });

    // Quando terminar de receber todos os dados:
    req.on('end', () => {
      // O formulário chega em formato de texto: "nome=Joao&email=joao@teste.com"
      // Usamos URLSearchParams para transformar isso em variáveis fáceis de ler
      const dados = new URLSearchParams(corpoDaRequisicao);
      const nome = dados.get('nome');
      const email = dados.get('email');
      const cidade = dados.get('cidade');
    
      // Imprime os dados no terminal da máquina servidora
      console.log(`[NOVO CADASTRO RECEBIDO] Nome: ${nome} | E-mail: ${email} | cidade: ${cidade}`); 
      
      // Responde para a máquina cliente que deu tudo certo
      res.statusCode = 200;
      res.end(`
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
          <h2>Sucesso!</h2>
          <p>Obrigado, <strong>${nome}</strong>.</p>
          <p>Seus dados foram salvos no servidor.</p>
          <br>
          <a href="/">Voltar para o início</a>
        </div>
      `);
    });
  }
 
  // 3. PÁGINA NÃO ENCONTRADA: Caso a pessoa digite uma URL inválida
  else {
    res.statusCode = 404;
    res.end('<h1>404 - Página não encontrada.</h1>');
  }
});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando e acessível na porta ${port}`);
  console.log('Esperando por novos cadastros...');
});