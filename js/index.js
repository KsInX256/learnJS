const buttons = document.querySelectorAll('.btn');
const modal = document.querySelector('.modalBg');
const modalBtns = document.querySelectorAll('.modalBtn');
const modalBtnYes = document.querySelector('#btnYes');
const modalBtnNo = document.querySelector('#btnNo');
const modalText = document.querySelector('.mBody > p');
const closeButton = document.querySelector('.mCloseButton');
const goToTop = document.querySelector('.goToTop');


goToTop.addEventListener('click', goTop);

window.addEventListener('scroll', () => {
    goToTop.style.display = 'block';
    if(window.scrollY === 0) {
        goToTop.style.display = 'none';
    }
})

function goTop(){
    if(window.scrollY > 0){
        window.scrollBy(0, -25);
        setTimeout(goTop,0);
    }
}


fetch("./questions.json")
    .then((res) => res.json())
    .then((data)  => {
        const getRandomIndex = function getRandomIndex(min= 0, max = data.statements.length) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        modalText.innerHTML = data.statements[getRandomIndex()];

        modalBtns.forEach((modalBtn) => {
            modalBtn.addEventListener('click', (e) => {
                let modalTextIndex = data.statements.indexOf(modalText.textContent);
                e.target.contains(modalBtnNo) ? modalText.innerHTML = data.statements[getRandomIndex()] : modalText.innerHTML = data.statements[getRandomIndex()];

                if (e.currentTarget.contains(modalBtnYes)) {
                    data.answers[modalTextIndex] === 'True' ? modal.style.display = 'none' : modal.style.display = 'block';
                }

                if (e.currentTarget.contains(modalBtnNo)) {
                    data.answers[modalTextIndex] === 'False' ? modal.style.display = 'none' : modal.style.display = 'block';
                }

            })
        })
    })


closeButton.addEventListener('click', () => {
        modal.style.display = 'none';

        buttons.forEach((el) => {
            el.nextElementSibling.classList.add('answer_hidden');
        })
    })


buttons.forEach((button) => {
    const answer = button.nextElementSibling;

    button.addEventListener('click', () => {

        if(answer.closest('.answer_hidden')){
            modal.style.display = 'block';
        }

        answer.closest('.answer_hidden')
            ? answer.classList.toggle('answer_hidden')
            : answer.classList.toggle('answer_hidden')

        const lockbtn = button.querySelector('div > i');
        !answer.closest('.answer_hidden')
            ? lockbtn.classList.replace('fa-lock', 'fa-unlock-keyhole')
            : lockbtn.classList.replace('fa-unlock-keyhole', 'fa-lock')

    })
})


document.addEventListener('mousemove', (e) => {
    Object.assign(document.documentElement, {
        style: `
            --move-x: ${(e.clientX - window.innerHeight/2) * .01}deg;
            --move-y: ${(e.clientY - window.innerWidth/2) * .01}deg;
        `
    })
})

modal.addEventListener('click', (e) => {
    if(e.currentTarget === e.target){
        modal.style.display = 'none';

        buttons.forEach((el) => {
            el.nextElementSibling.classList.add('answer_hidden');
        })
    }
})