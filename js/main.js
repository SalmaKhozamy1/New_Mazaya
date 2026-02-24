document.addEventListener("DOMContentLoaded", () => {
    // --- Counter Animation ---
    const startCounter = (el) => {
        const target = parseFloat(el.getAttribute("data-target"));
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 2000; // 2 seconds
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = progress * target;
            
            // Format number based on decimals
            let displayNum;
            if (target % 1 !== 0) {
                displayNum = currentCount.toFixed(1);
            } else {
                displayNum = Math.floor(currentCount);
            }

            el.innerHTML = `${prefix}${displayNum}${suffix}`;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure final number is exact
                el.innerHTML = `${prefix}${target}${suffix}`;
            }
        };

        window.requestAnimationFrame(step);
    };

    // Use IntersectionObserver to trigger when visible
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll(".stat-number");
                counters.forEach(counter => startCounter(counter));
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector(".clarity-stats-row");
    if (statsSection) {
        observer.observe(statsSection);
    }

    // --- Identity Tabs Logic ---
    const tabs = document.querySelectorAll(".identity-tab");
    const panes = document.querySelectorAll(".identity-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-tab");

            // Remove active classes
            tabs.forEach(t => t.classList.remove("active"));
            panes.forEach(p => p.classList.remove("active"));

            // Add active class to clicked tab and corresponding pane
            tab.classList.add("active");
            const targetPane = document.getElementById(target);
            if (targetPane) targetPane.classList.add("active");
        });
    });
});
