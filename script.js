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

  for (let i = 0; i < expectedAge; i++) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'center';

    for (let j = 0; j < weeksPerYear; j++) {
      const week = document.createElement('div');
      week.classList.add('week');
      if (i * weeksPerYear + j < livedWeeks) {
        week.classList.add('filled');
      }
      row.appendChild(week);
    }

    diagram.appendChild(row);
  }
}
