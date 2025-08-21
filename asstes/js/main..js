document.querySelectorAll('.rating').forEach(rating => {
    const stars = rating.querySelectorAll('.star');
    const input = rating.querySelector('input[type="hidden"]');

    function paint(val) {
        stars.forEach(star => {
            star.classList.toggle('active', Number(star.dataset.value) <= val);
        });
    }

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = Number(star.dataset.value);
            input.value = val;   
            paint(val);
        });

        star.addEventListener('mouseenter', () => {
            paint(Number(star.dataset.value));
        });

        rating.addEventListener('mouseleave', () => {
            paint(Number(input.value));
        });
    });
});