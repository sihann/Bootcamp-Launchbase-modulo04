const cards = document.querySelectorAll('.card');

// adiciona uma class em todos os cards
for (let card of cards) {
    card.addEventListener("click", function(){
        const cursoId = card.getAttribute('id')
        window.location.href = `/courses/${cursoId}` 
    })
}

