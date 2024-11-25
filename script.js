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

  // Adjust spacing and margins based on screen size
  const spacing = 2; // 2px gap between squares
  const margin = isMobile ? 10 : 20; // More space on mobile to ensure all squares fit

  const availableWidth = containerWidth - margin * 2 - (weeksPerYear - 1) * spacing;
  const squareSize = Math.max(Math.floor(availableWidth / weeksPerYear), 5); // Ensure minimum square size of 5px

  // Ensure all 52 squares fit inside the screen width on mobile and desktop
  if (isMobile) {
    diagram.style.paddingLeft = '10px';  // Adjust left margin for mobile
    diagram.style.paddingRight = '10px'; // Adjust right margin for mobile
  } else {
    diagram.style.paddingLeft = `${margin}px`;  // Adjust left margin for desktop
    diagram.style.paddingRight = `${margin}px`; // Adjust right margin for desktop
  }

  // Generate the diagram row by row
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
