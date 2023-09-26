async function done() {
    const url = '/done';

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await res.json();

        if (!result.error) {
            window.location.replace("/");
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('GoToPlatformsButton').addEventListener('click', done);

async function selectGame() {
    const url = '/games';

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await res.json();

        if (!result.error) {
            window.location.replace("/");
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('GoToGamesButton').addEventListener('click', selectGame);

function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}

window.addEventListener('scroll', scrollHeader);

const btnGenerate = document.getElementById('btnGenerate');
btnGenerate.addEventListener('click', getOpportunity);

const normalRounds = document.querySelector('#normalRounds');
const turboRounds = document.querySelector('#turboRounds');
const loading = document.querySelector('#loadingMessages');
const validade = document.querySelector('#validade');

async function getOpportunity() {
    btnGenerate.disabled = true;
    setTimeout(() => {
        btnGenerate.disabled = false;
    }, 60000);

    generatingAudio();

    const loadingTexts = [
        `<span class="MatrixTextEffect" style="font-size:1em">Estabelecendo conexão com o servidor</span>`,
        `<span class="MatrixTextEffect" style="font-size:1em">Buscando oportunidades na plataforma..</span>`,
        `<span class="MatrixTextEffect" style="font-size:1em">Não atualize esta página</span>`,
        `<span class="MatrixTextEffect Pulse" style="font-size:1.4em; text-align: center;"><b>ESTAMOS IDENTIFICANDO<br>UM PADRÃO</b></span>`
    ];

    async function showLoadingTexts() {
        for (const text of loadingTexts) {
            loading.innerHTML = text;

            // Obtenha e ajustando a altura
            const contentHeight = loading.scrollHeight;
            loading.style.height = `${contentHeight}px`;

            await new Promise(resolve => setTimeout(resolve, 1500));
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await showLoadingTexts();

    const url = '/getOpportunity';

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await res.json();

        await successAudio();
        
        // Final message 
        loading.innerHTML = `<span class="MatrixTextEffect" style="font-size:2em"><b>OPORTUNIDADE IDENTIFICADA</b></span>`;
        const contentHeight = loading.scrollHeight;
        loading.style.height = `${contentHeight}px`;

        // Opportunity
        normalRounds.innerHTML = `<b>${result.normalRounds} RODADAS</b>`;
        turboRounds.innerHTML = `<b>${result.turboRounds} RODADAS</b>`;
        const currentTime = new Date();
        const validadeTime = new Date(currentTime.getTime() + 360000);
        const hours = validadeTime.getHours();
        const minutes = validadeTime.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        validade.innerHTML = `<b>${formattedTime}</b>`;

        //console.log(result);
    } catch (error) {
        console.error(error);
    }
}

async function generatingAudio() {
    let generatingAudio = document.querySelector("#generatingAudio");
    generatingAudio.play();
}

async function successAudio() {
    let successAudio = document.querySelector("#successAudio");
    await successAudio.play();
}