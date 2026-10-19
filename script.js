
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const placeholder = document.getElementById('placeholder');
const mensagem = document.getElementById('mensagem');
const inputNome = document.getElementById('nome');
const selectFiltro = document.getElementById('filtro');
const btnLigar = document.getElementById('btnLigar');
const btnCapturar = document.getElementById('btnCapturar');
const btnDesligar = document.getElementById('btnDesligar');

let stream = null;

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = 'mensagem' + (tipo ? ' ' + tipo : '');
}

function atualizarBotoes() {
  const ligada = stream !== null;
  btnLigar.disabled = ligada;
  btnDesligar.disabled = !ligada;
}

async function ligarCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    mostrarMensagem('Seu navegador não suporta acesso à câmera. Use um navegador atualizado e abra a página via HTTPS ou localhost.', 'erro');
    return;
  }

  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    mostrarMensagem('Câmera ligada. Clique em "Capturar foto".', 'sucesso');
  } catch (erro) {
    stream = null;
    if (erro.name === 'NotAllowedError' || erro.name === 'PermissionDeniedError') {
      mostrarMensagem('Permissão negada. Clique no ícone de cadeado/câmera na barra de endereço, permita o acesso e tente novamente.', 'erro');
    } else if (erro.name === 'NotFoundError' || erro.name === 'DevicesNotFoundError') {
      mostrarMensagem('Nenhuma câmera foi encontrada neste dispositivo.', 'erro');
    } else if (erro.name === 'NotReadableError') {
      mostrarMensagem('A câmera está sendo usada por outro aplicativo. Feche-o e tente novamente.', 'erro');
    } else {
      mostrarMensagem('Não foi possível acessar a câmera: ' + erro.message, 'erro');
    }
  }

  atualizarBotoes();
}

function desligarCamera() {
  if (stream) {
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    stream = null;
  }
  video.srcObject = null;
  mostrarMensagem('Câmera desligada. Clique em "Ligar câmera" para usar novamente.');
  atualizarBotoes();
}

function dataHoraAtual() {
  return new Date().toLocaleString('pt-BR');
}

  if (!stream || video.videoWidth === 0) {
    mostrarMensagem('Câmera indisponível. Clique em "Ligar câmera" antes de capturar.', 'erro');
    return;
  }

  {
  const nome = inputNome.value.trim() || 'Aluno';

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

 
  context.filter = selectFiltro.value;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  context.filter = 'none';

  
  const altura = Math.max(60, Math.round(canvas.height * 0.14));
  context.fillStyle = 'rgba(0, 0, 0, 0.55)';
  context.fillRect(0, canvas.height - altura, canvas.width, altura);

  
  const tamanhoFonte = Math.round(altura * 0.32);
  context.fillStyle = '#ffffff';
  context.font = 'bold ' + tamanhoFonte + 'px Arial';
  context.textBaseline = 'middle';
  context.fillText(nome, 16, canvas.height - altura * 0.68);
  context.fillText(dataHoraAtual(), 16, canvas.height - altura * 0.30);

  canvas.style.display = 'block';
  placeholder.style.display = 'none';
  mostrarMensagem('Foto capturada com sucesso!', 'sucesso');
}


btnLigar.addEventListener('click', ligarCamera);
btnCapturar.addEventListener('click', capturar);
btnDesligar.addEventListener('click', desligarCamera);


window.addEventListener('beforeunload', desligarCamera);

atualizarBotoes();