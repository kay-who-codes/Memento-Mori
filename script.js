document.addEventListener("DOMContentLoaded", function () {
    const birthdateInput = document.getElementById("birthdate");
    const lifespanInput = document.getElementById("lifespan");
    const weeksContainer = document.getElementById("weeks-container");

    function calculateWeeksLived(birthdate, lifespan) {
        const birthDate = new Date(birthdate);
        const today = new Date();
        const totalWeeks = lifespan * 52;
        
        // Calculate lived weeks
        const differenceInTime = today - birthDate;
        const livedWeeks = Math.floor(differenceInTime / (1000 * 60 * 60 * 24 * 7));

        return { livedWeeks, totalWeeks };
    }

    function generateWeeksDiagram() {
        const birthdate = birthdateInput.value;
        const lifespan = parseInt(lifespanInput.value, 10);

        if (!birthdate || isNaN(lifespan) || lifespan <= 0) return;

        const { livedWeeks, totalWeeks } = calculateWeeksLived(birthdate, lifespan);
        weeksContainer.innerHTML = "";

        for (let i = 0; i < totalWeeks; i++) {
            const weekElement = document.createElement("div");
            weekElement.classList.add("week");
            if (i < livedWeeks) {
                weekElement.classList.add("filled");
            } else {
                weekElement.classList.add("unfilled");
            }
            weeksContainer.appendChild(weekElement);
        }
    }

    // Update diagram whenever inputs change
    birthdateInput.addEventListener("input", generateWeeksDiagram);
    lifespanInput.addEventListener("input", generateWeeksDiagram);

    // Initial diagram
    generateWeeksDiagram();
});
