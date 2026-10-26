/* ---------- theme toggle ---------- */
    const toggle = document.getElementById("themeToggle");
    const body = document.body;
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light");
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    toggle.onclick = () => {
        body.classList.toggle("light");
        const isLight = body.classList.contains("light");
        localStorage.setItem("theme", isLight ? "light" : "dark");
        toggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    };

    /* ---------- mobile menu (single hamburger) ---------- */
    function toggleMenu() {
        document.getElementById('navLinks').classList.toggle('active');
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => document.getElementById('navLinks').classList.remove('active'));
    });

    /* ---------- hero typing effect ---------- */
    const roles = ["AI & Data Science Student", "Full-Stack Developer", "RAG / LLM Builder"];
    const typedEl = document.getElementById('typedRole');
    let rIndex = 0, cIndex = 0, deleting = false;
    function typeLoop() {
        const current = roles[rIndex];
        if (!deleting) {
            cIndex++;
            typedEl.textContent = current.slice(0, cIndex);
            if (cIndex === current.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
        } else {
            cIndex--;
            typedEl.textContent = current.slice(0, cIndex);
            if (cIndex === 0) { deleting = false; rIndex = (rIndex + 1) % roles.length; }
        }
        setTimeout(typeLoop, deleting ? 40 : 65);
    }
    typeLoop();

    /* ---------- scroll reveal ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));

    /* ---------- emailjs ---------- */
    (function () { emailjs.init("xAvJ55-C91FnXxKD4"); })();

    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const label = document.getElementById('submit-label');
        const spinner = document.getElementById('submit-spinner');
        label.textContent = 'Sending...';
        spinner.style.display = 'inline-block';

        const serviceID = 'service_h0bul4w';
        const templateID = 'template_ipqebol';

        emailjs.sendForm(serviceID, templateID, this).then(() => {
            spinner.style.display = 'none';
            label.textContent = 'Message Sent!';
            document.getElementById('submit-btn').style.background = '#22c55e';
            alert('Your message has been sent successfully!');
            document.getElementById('contact-form').reset();
        }, (err) => {
            spinner.style.display = 'none';
            label.textContent = 'Send Message';
            alert('Failed to send message. Error: ' + JSON.stringify(err));
        });
    });

    /* ---------- image modal ---------- */
    function openModal(imagePath, title, meta) {
        const modal = document.getElementById('modal');
        const text = document.getElementById('modal-text');
        const img = document.getElementById('modal-img');
        const fallback = document.getElementById('modal-fallback');
        const fallbackPath = document.getElementById('modal-fallback-path');
        const metaBox = document.getElementById('modal-meta');

        // reset state each time
        img.style.display = 'block';
        fallback.style.display = 'none';
        fallbackPath.textContent = imagePath;

        img.onerror = () => { img.style.display = 'none'; fallback.style.display = 'flex'; };
        img.onload = () => { img.style.display = 'block'; fallback.style.display = 'none'; };

        img.src = imagePath;
        img.alt = title || imagePath;
        text.innerText = title || imagePath;

        metaBox.innerHTML = '';
        if (meta) {
            const items = [
                meta.org ? { icon: 'fa-building', label: meta.org } : null,
                meta.date ? { icon: 'fa-calendar-alt', label: meta.date } : null,
                meta.type ? { icon: 'fa-tag', label: meta.type } : null,
            ].filter(Boolean);
            items.forEach(it => {
                const span = document.createElement('span');
                span.innerHTML = `<i class="fas ${it.icon}"></i>${it.label}`;
                metaBox.appendChild(span);
            });
        }

        document.body.style.overflow = 'hidden';
        modal.style.display = "flex";
        requestAnimationFrame(() => modal.classList.add('open'));
    }
    function closeModal() {
        const modal = document.getElementById('modal');
        modal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { modal.style.display = "none"; }, 300);
    }
    window.onclick = function (event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) closeModal();
    };
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
