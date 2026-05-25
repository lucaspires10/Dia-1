 let nivelAtual = 1;

        function subirNivel() {
            nivelAtual = nivelAtual + 1; // Soma 1 ao nível
            document.getElementById("nivel").innerText = nivelAtual; // Atualiza na tela
           
            // Pequeno desafio de lógica para ele ver o JS tomando decisões
            if (nivelAtual === 20) {
                alert("Parabéns! Você alcançou o Nível Ouro!");
            }
        }