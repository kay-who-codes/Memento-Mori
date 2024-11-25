// Ensure content is not overlapped by the header
function adjustContent() {
  const headerHeight = document.querySelector('.header-bar').offsetHeight;
  document.querySelector('main').style.paddingTop = `${headerHeight}px`;
}

function generateDiagram() {
  const birthDate = new Date(document.getElementById('birthDate').value);
  const expectedAge = parseInt(document.getElementById('expectedAge').value);
  const diagram = document.getElementById('diagram');
  diagram.innerHTML = '';

  const weeksPerYear = 52;
  const currentDate = new Date();
  const age = (currentDate - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
  const totalWeeks = expectedAge * weeksPerYear;
  const livedWeeks = Math.floor(age * weeksPerYear);

  // Calculate the square size and spacing for desktop
  const containerWidth = window.innerWidth;
  const isMobile = containerWidth <= 768;
  const margin = isMobile ? 4 : 0; // Add margin for mobile screens
  const spacing = 5; // 5px spacing between squares
  const squareSize = Math.floor((containerWidth - margin * 2 - (weeksPerYear - 1) * spacing) / weeksPerYear);

  for (let i = 0; i < expectedAge; i++) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'center';
    row.style.marginBottom = `${spacing}px`;

    for (let j = 0; j < weeksPerYear; j++) {
      const week = document.createElement('div');
      week.classList.add('week');
      week.style.width = `${squareSize}px`;
      week.style.height = `${squareSize}px`;
      week.style.marginRight = j === weeksPerYear - 1 ? '0' : `${spacing}px`;

      if (i * weeksPerYear + j < livedWeeks) {
        week.classList.add('filled');
      }

      row.appendChild(week);
    }

    diagram.appendChild(row);
  }
}

// Adjust content and regenerate diagram on page load and resize
window.onload = () => {
  adjustContent();
  generateDiagram();
};
window.onresize = () => {
  adjustContent();
  generateDiagram();
};
