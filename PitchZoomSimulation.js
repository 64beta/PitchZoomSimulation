(() => {
    let target = document.body;
    let currentScale = 1;
    let targetScale = 1;
    const scaleStep = 0.1;
    const minScale = 0.3;
    const maxScale = 3;
    let originX = 0;
    let originY = 0;

    function animateZoom() {
        const diff = targetScale - currentScale;
        if (Math.abs(diff) > 0.001) {
            currentScale += diff * 0.15; // <== dəyişsən sürəti yumşala/itiləşər
            target.style.transformOrigin = `${originX}px ${originY}px`;
            target.style.transform = `scale(${currentScale})`;
            requestAnimationFrame(animateZoom);
        }
    }

    window.addEventListener("wheel", function (e) {
        if (!e.ctrlKey) return;

        e.preventDefault();

        if (e.deltaY < 0) {
            targetScale += scaleStep;
        } else {
            targetScale -= scaleStep;
        }

        targetScale = Math.max(minScale, Math.min(maxScale, targetScale));

        originX = e.clientX;
        originY = e.clientY;

        animateZoom();
    }, { passive: false });

    window.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.key === "0") {
            targetScale = 1;
            animateZoom();
        }
    });
})();