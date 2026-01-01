const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];

function startCelebration() {
    const name = document.getElementById("nameInput").value || "Friend";

    document.getElementById("inputBox").style.display = "none";

    const msg = document.getElementById("message");
    document.getElementById("userMessage").innerText =
        `${name} Happy New Year 2026 🎆`;

    msg.classList.add("zoom");

    launchFirework();
}

function launchFirework() {
    let x = canvas.width / 2;
    let y = canvas.height;

    let rocket = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        y -= 15;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        if (y < canvas.height / 3) {
            clearInterval(rocket);
            explode(x, y);
        }
    }, 30);
}

function explode(x, y) {
    for (let i = 0; i < 120; i++) {
        particles.push({
            x,
            y,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 6 + 2,
            alpha: 1,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`
        });
    }
    animate();
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.01;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.alpha <= 0) particles.splice(i, 1);
    });

    ctx.globalAlpha = 1;
    if (particles.length > 0) requestAnimationFrame(animate);
}
