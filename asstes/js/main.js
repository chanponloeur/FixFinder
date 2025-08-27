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

// ================= counter

function compact(n, decimals) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
}

function animateCounter(el) {
    const target = parseFloat(el.dataset.target || '0');
    const suffix = el.dataset.suffix || '';
    // Accept both data-decimals="1" and legacy data-decimal="true/1"
    const decimals = Number(el.dataset.decimals ||
        (el.dataset.decimal === 'true' || el.dataset.decimal === '1' ? 1 : 0));
    const compactOn = el.dataset.compact === 'true';
    const duration = Number(el.dataset.duration || 1200); // ms

    let start = null;
    function tick(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const current = target * progress;

        let display = compactOn ? compact(current, decimals)
            : (decimals > 0 ? current.toFixed(decimals)
                : Math.round(current).toString());

        // Always show suffix during animation (fixes "0" without "/7")
        el.textContent = display + suffix;

        if (progress < 1) requestAnimationFrame(tick);
        else {
            // Snap to exact final value
            let finalDisplay = compactOn ? compact(target, decimals)
                : (decimals > 0 ? target.toFixed(decimals)
                    : Math.round(target).toString());
            el.textContent = finalDisplay + suffix;
        }
    }
    requestAnimationFrame(tick);
}

// Start when visible (prevents running off-screen)
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.counter').forEach(el => observer.observe(el));
//---------------- auto typing script --------------------------
let typeJsText = document.querySelector(".typeJsText");
let textArray = typeJsText.dataset.typetext.split("");
let counter = -1;

typeJsText.innerHTML = "";

function typeJs() {
  if (counter < typeJsText.dataset.typetext.length) {
    counter++;
    typeJsText.innerHTML += typeJsText.dataset.typetext.charAt(counter);
    textArray = typeJsText.dataset.typetext.split("");
  } else {
    textArray.pop();
    typeJsText.innerHTML = textArray.join("");
    if (textArray.length == 0) {
      counter = -1;
    }
  }
}

setInterval(() => {
  typeJs();
}, 100);