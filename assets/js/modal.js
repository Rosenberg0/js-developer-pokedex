

function openModal() {
    const modal = document.getElementById('modalWindow');
    modal.classList.add('open');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'close' || e.target.id == 'modalWindow') {
            modal.classList.remove('open');
            clearModal()
        }
        
    });  
}

function clearModal(){
    const detail = document.getElementById('modalDetail')
    detail.innerHTML = '';
}


