# Camera_PFE

## Integrante
- Aquiles Bastos

## Descrição
Aplicação web feita para a disciplina de Programação Front-End (Profa. Andreza Quintas). Ela acessa a câmera do dispositivo, mostra a imagem em tempo real e permite capturar uma foto. A foto recebe um efeito visual e, sobre ela, são escritos o nome do aluno e a data e hora da captura. O usuário também pode desligar a câmera e ligá-la de novo.

## Funcionalidades
- Pedido de permissão e exibição da câmera em tempo real
- Captura de foto a partir do vídeo
- Efeito visual escolhido pelo usuário (sépia, preto e branco ou invertido)
- Nome do aluno e data/hora escritos sobre a foto
- Botão "Desligar câmera" que para todas as tracks do stream
- Mensagens de orientação quando a permissão é negada ou não há câmera disponível

## Recursos utilizados
- HTML, CSS e JavaScript puro (sem bibliotecas ou frameworks)
- `navigator.mediaDevices.getUserMedia()` para acessar a câmera
- `MediaStreamTrack.stop()` para encerrar o stream
- `canvas`, `drawImage()`, `context.filter` e `fillText()` para processar e compor a imagem
- Eventos JavaScript e manipulação do DOM

## Como executar
Abra o `index.html` em um navegador moderno usando `localhost` ou HTTPS (por exemplo, com a extensão Live Server do VS Code), pois a câmera não funciona em páginas abertas sem contexto seguro.