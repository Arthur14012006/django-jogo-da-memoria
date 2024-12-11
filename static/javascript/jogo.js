const grade = document.querySelector('.grade');
const personagens = ['aragorn', 'boromir', 'gandalf', 'gimli', 'legolas', 'sauron'];
let cartasReveladas = 0;
let totalCorrespondencia = 0;
let primeiraCarta, segundaCarta;
let tentativas = 0;
let tempoInicial, tempoFinal;

const tentativasElement = document.getElementById('jogadas');
const tentativasInput = document.getElementById('tentativas');
const tempoInput = document.getElementById('tempo');
const formulario = document.querySelector('form');

const createElement = (tag, className) => {
    const elemento = document.createElement(tag);
    elemento.className = className;
    return elemento;
}

const revelarCarta = ({ target }) => {
    if (target.parentNode.classList.contains('cartao-revelacao') || cartasReveladas >= 2) {
        return;
    }

    if (cartasReveladas === 0) {
        tempoInicial = new Date(); 
    }

    target.parentNode.classList.add('cartao-revelacao');
    cartasReveladas++;

    if (cartasReveladas === 1) {
        primeiraCarta = target.parentNode;
    } else if (cartasReveladas === 2) {
        segundaCarta = target.parentNode;

        const primeiraCartaImage = primeiraCarta.querySelector('.face.frente').style.backgroundImage;
        const segundaCartaImage = segundaCarta.querySelector('.face.frente').style.backgroundImage;

        atualizarTentativas();

        if (primeiraCartaImage === segundaCartaImage) {
            setTimeout(() => {
                primeiraCarta.classList.add('igual');
                segundaCarta.classList.add('igual');
                resetarCartas();

                totalCorrespondencia++;

                if (totalCorrespondencia === personagens.length) {
                    tempoFinal = new Date(); 
                    const tempoGasto = tempoFinal - tempoInicial; 
                
                    tentativasInput.value = tentativas;
                    tempoInput.value = tempoGasto;
                
                    alert('Parabéns! Você encontrou todas as cartas correspondentes. Clique em "Salvar Resultado" para registrar sua partida.');
                
                    formulario.style.display = 'block';
                }
            }, 1000);
        } else {
            setTimeout(() => {
                primeiraCarta.classList.remove('cartao-revelacao');
                segundaCarta.classList.remove('cartao-revelacao');
                resetarCartas();
            }, 1000);
        }
    }
}

const resetarCartas = () => {
    cartasReveladas = 0;
    primeiraCarta = null;
    segundaCarta = null;
}

const criarCarta = (pessoa) => {
    const cartaEscondida = createElement('div', 'carta-escondida');
    const carta = createElement('div', 'carta');
    const frente = createElement('div', 'face frente');
    const atras = createElement('div', 'face atras');

    frente.style.backgroundImage = `url('${imgBaseUrl}${pessoa}.jpeg')`;

    carta.appendChild(frente);
    carta.appendChild(atras);
    cartaEscondida.appendChild(carta);

    cartaEscondida.addEventListener('click', revelarCarta);

    return cartaEscondida;
}

const carregarJogo = () => {
    const duplicarPersonagens = [...personagens, ...personagens];
    const cartasEmbaralhadas = duplicarPersonagens.sort(() => Math.random() - 0.5);

    cartasEmbaralhadas.forEach((pessoa) => {
        const carta = criarCarta(pessoa);
        grade.appendChild(carta);
    });
}

const atualizarTentativas = () => {
    tentativas++;
    tentativasElement.textContent = `Tentativas: ${tentativas}`;
}

carregarJogo();
