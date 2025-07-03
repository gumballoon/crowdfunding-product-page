// reload the page by clicking on the logo
const logo = document.querySelector('#logo');
logo.addEventListener('click', function(){ 
    window.location.reload();
})

// display the nav mobile
const navToggler = document.querySelector('#nav-toggler');
const iconHamburger = document.querySelector('#icon-hamburger');
const iconClose = document.querySelector('#icon-close');
const navMobile = document.querySelector('#nav-mobile');
navToggler.addEventListener('change', function(){
    iconHamburger.classList.toggle('d-none');
    iconClose.classList.toggle('d-none');
    navMobile.classList.toggle('d-none');
})

// reset to the default state w/ every media query change
const mobile = window.matchMedia('(max-width:576px)');
const destktop = window.matchMedia('(max-width:992px')
for (let media of [mobile, destktop]) {
    media.addEventListener('change', function(e){
        iconHamburger.classList.remove('d-none');
        iconClose.classList.add('d-none');
        navMobile.classList.add('d-none');
    })
}

// switch between 'bookmark' & 'bookmarked'
const bookmark = document.querySelector('#bookmark');
const bookmarkSpan = document.querySelector('label[for="bookmark"] span');
const bookmarkPath = document.querySelector('label[for="bookmark"] svg path');
const bookmarkCircle = document.querySelector('label[for="bookmark"] svg circle');
const bookmarkDiv = bookmark.parentElement;
bookmark.addEventListener('change', function(){
    if(this.checked) {
        bookmarkSpan.textContent = 'Bookmarked';
        bookmarkPath.setAttribute('fill', 'white');
        bookmarkCircle.setAttribute('fill', ' hsl(176, 72%, 28%)');
        bookmarkDiv.setAttribute('title', 'click to unbookmark this project');
        bookmarkDiv.setAttribute('aria-label', 'click to unbookmark this project');
    } else {
        bookmarkSpan.textContent = 'Bookmark';
        bookmarkPath.setAttribute('fill', '#B1B1B1');
        bookmarkCircle.setAttribute('fill', '#2F2F2F');
        bookmarkDiv.setAttribute('title', 'click to bookmark this project');
        bookmarkDiv.setAttribute('aria-label', 'click to bookmark this project');
    }
})

let allRadios = document.querySelectorAll('input[type="radio"]');
// ignore the Mahogany section (disabled)
allRadios = Array.from(allRadios).filter(r => !r.disabled);
const allPledgeBoxes = document.querySelectorAll('.pledge-box');
for (let radio of allRadios) {
    const section = radio.parentElement.parentElement.parentElement.parentElement;
    const pledgeBox = section.querySelector('.pledge-box');

    radio.addEventListener('change', function(){ 
        // reset the views on all pledges
        for (let r of allRadios) {
            const radioSection =  r.parentElement.parentElement.parentElement.parentElement;
            radioSection.classList.remove('section-selected');
        }
        for (let pledge of allPledgeBoxes) {
            pledge.classList.add('d-none');
        }

        // add the checked/selected styling
        const label = this.parentElement.querySelector('label');
        if (this.checked) {
            console.dir(label)
            section.classList.add('section-selected');
            if (pledgeBox) {
                pledgeBox.classList.remove('d-none');
            }
            label.style.backgroundColor = 'hsl(176, 50%, 47%)';
        } else {
            // hide the checked input styling
            label.style.backgroundColor = 'transparent';
        }
    })
}

const modal = document.querySelector('#modal');
const modalSection = document.querySelector('#modal-section');
const bamboo = document.querySelector('#bamboo-stand');
const black = document.querySelector('#black-edition');
const rewardBamboo = document.querySelector('#reward-bamboo');
const rewardBlack = document.querySelector('#reward-dark');
const modalCheck = document.querySelector('#modal-check');
const allOpenModal = document.querySelectorAll('.open-modal');
const allOpenModalCheck = document.querySelectorAll('.open-modal-check');
const closeModal = document.querySelector('#close-modal');
const closeModalPath = document.querySelector('#close-modal path');
const modalCheckButton = document.querySelector('#modal-check button');

for (let open of allOpenModal) {
    open.addEventListener('click', function() {
        modal.classList.remove('d-none');
        modalSection.classList.remove('d-none');

        if(this.id === 'reward-bamboo') {
            bamboo.setAttribute('checked', 'true');
            const label = bamboo.parentElement.querySelector('label');
            label.style.backgroundColor = 'hsl(176, 50%, 47%)';

            const parentSection = bamboo.parentElement.parentElement.parentElement.parentElement;
            const parentPledgeBox = parentSection.querySelector('.pledge-box');

            parentSection.classList.add('section-selected');
            parentPledgeBox.classList.remove('d-none');

            parentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } else if (this.id === 'reward-black') {
            black.setAttribute('checked', 'true');
            const label = black.parentElement.querySelector('label');
            label.style.backgroundColor = 'hsl(176, 50%, 47%)';

            const parentSection = black.parentElement.parentElement.parentElement.parentElement;
            const parentPledgeBox = parentSection.querySelector('.pledge-box');

            parentSection.classList.add('section-selected');
            parentPledgeBox.classList.remove('d-none');

            parentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
        }
    })
}

closeModal.addEventListener('mouseover', function() {
    closeModalPath.setAttribute('opacity', 1);
})
closeModal.addEventListener('mouseout', function() {
    closeModalPath.setAttribute('opacity', 0.4);
})

const allErrors = document.querySelectorAll('.error');
function resetModal() {
    for (let radio of allRadios) {
        radio.removeAttribute('checked');
        const label = radio.parentElement.querySelector('label');
        label.style.backgroundColor = 'transparent';
        const radioSection =  radio.parentElement.parentElement.parentElement.parentElement;
        radioSection.classList.remove('section-selected');
        const pledgeBox = radioSection.querySelector('.pledge-box');
        if (pledgeBox) {
            pledgeBox.classList.add('d-none');
        }
    }
    for (let error of allErrors) {
        error.classList.add('d-none');
    }
    modal.classList.add('d-none');
    modalSection.classList.add('d-none');
}

closeModal.addEventListener('click', function() {
    resetModal();
})

function openModalCheck(){
    modalSection.classList.add('d-none');
    modalCheck.classList.remove('d-none');
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}
// validate the pledge forms, open the confirmation window & update the trackers
const allBambooLeft = document.querySelectorAll('.bamboo-left');
const allBlackLeft = document.querySelectorAll('.black-left');
let pledgeValue = 0;
for (let open of allOpenModalCheck) {
    // if it's part of a form (i.e. paying tier)
    if (open.nodeName === 'BUTTON') {
        const form = open.parentElement;
        const error = form.querySelector('.error');

        form.addEventListener('submit', function(e) {
            // prevent the form submission
            e.preventDefault();
            const input = form.querySelector('input');

            // show the error message & reset the input value
            if(!input.checkValidity()) {
                if(input.id === 'pledge-bamboo') {
                    input.value = 25;
                } else {
                    input.value = 75;
                }
                error.classList.remove('d-none');
            
            // update the nº of units left
            } else {
                if(input.id === 'pledge-bamboo') {
                    input.value = 25;
                    for (let bambooLeft of allBambooLeft) {
                        bambooLeft.textContent = parseInt(bambooLeft.textContent) - 1;
                    }
                } else {
                    input.value = 75;
                    for (let blackLeft of allBlackLeft) {
                        blackLeft.textContent = parseInt(blackLeft.textContent) - 1;
                    }
                }
                error.classList.add('d-none');
                pledgeValue = parseInt(input.value);
                openModalCheck();
            }
        })
    } 

    // if it's the no-reward tier    
    else {
        open.addEventListener('click', function() {
            openModalCheck();
        })
    }


}

// reset the view & update the stats
const backed = document.querySelector('#backed');
const backers = document.querySelector('#backers');
const meter = document.querySelector('#meter div');
modalCheckButton.addEventListener('click', function() {
    let backedValue = parseInt(backed.textContent.replace(',', ''));
    backedValue += pledgeValue;
    backed.textContent = backedValue.toLocaleString('en-US');

    let backersValue = parseInt(backers.textContent.replace(',', ''));
    backersValue += 1;
    backers.textContent = backersValue.toLocaleString('en-US');

    const meterPercentage = (backedValue / 100000) * 100;
    meter.style.width = meterPercentage + '%';

    resetModal();
    modalCheck.classList.add('d-none');
})