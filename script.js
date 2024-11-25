// Ensure content is not overlapped by the header
function adjustContent() {
  const headerHeight = document.querySelector('.header-bar').offsetHeight;
  document.querySelector('main').style.paddingTop = `${headerHeight}px`;
}

function generateDiagram() {
  const startDate = new Date('1990-01-01');
  const endDate = new Date('2070-01-01');
  const currentDate = new Date();
  const diagram = document.getElementById('diagram');
  diagram.innerHTML = '';

  const weeksPerYear = 52;
  const totalWeeks = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24 * 7));
  const weeksPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 7));

  // Calculate the square size and spacing for desktop/mobile
  const containerWidth = window.innerWidth;
  const isMobile = containerWidth <= 768;
  const margin = isMobile ? 4 : 0; // Add margin for mobile screens
  const spacing = 5; // 5px spacing between squares
  const squareSize = Math.floor((containerWidth - margin * 2 - (weeksPerYear - 1) * spacing) / weeksPerYear);

  for (let i = 0; i < Math.ceil(totalWeeks / weeksPerYear); i++) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'center';
    row.style.marginBottom = `${spacing}px`;

    for (let j = 0; j < weeksPerYear; j++) {
      const weekIndex = i * weeksPerYear + j;
      const week = document.createElement('div');
      week.classList.add('week');
      week.style.width = `${squareSize}px`;
      week.style.height = `${squareSize}px`;
      week.style.marginRight = j === weeksPerYear - 1 ? '0' : `${spacing}px`;

      if (weekIndex < weeksPassed) {
        week.classList.add('filled');
      }

      row.appendChild(week);

      if (weekIndex >= totalWeeks - 1) {
        break; // Stop adding squares when the total weeks are reached
      }
    }

    diagram.appendChild(row);
  }
}

// Adjust content and generate diagram on page load and resize
window.onload = () => {
  adjustContent();
  generateDiagram();
};
window.onresize = () => {
  adjustContent();
  generateDiagram();
};
