// Load stored moods from localStorage
let selectedMood = '';
let moods = JSON.parse(localStorage.getItem('moods')) || {};

// Load background color from localStorage on page load
const savedBackground = JSON.parse(localStorage.getItem('background'));
if (savedBackground) {
    document.body.style.backgroundColor = savedBackground;
}

// Function to select a mood
function selectMood(emoji) {
    selectedMood = emoji;
    changeBackground(emoji);
}

// Function to change background color and store it in localStorage
function changeBackground(emoji) {
    const colors = {
        '😊': '#ffeb3b',  // Yellow
        '😢': '#90caf9',  // Light Blue
        '😐': '#bdbdbd',  // Gray
        '🤩': '#ff9800',  // Orange
        '😡': '#f44336'   // Red
    };

    const selectedColor = colors[emoji] || '#ffffff';
    document.body.style.backgroundColor = selectedColor;

    // Store the selected background color in localStorage
    localStorage.setItem('background', JSON.stringify(selectedColor));
}

function addMood() {
    if (!selectedMood) {
        alert('Please select a mood!');
        return;
    }
    const dateInput = document.getElementById('mood-date').value;
    const today = dateInput || new Date().toISOString().split('T')[0];

    moods[today] = selectedMood; // Store in memory
    localStorage.setItem('moods', JSON.stringify(moods)); // Store in localStorage

    updateMoodHistory();
    updateCalendar(); // Update calendar after adding mood
    selectedMood = ''; // Reset mood
}

function updateMoodHistory() {
    const historyDiv = document.getElementById('mood-history');
    historyDiv.innerHTML = '';
    for (const [date, mood] of Object.entries(moods)) {
        historyDiv.innerHTML += `<div class="mood-entry">${date} - ${mood}</div> `;
    }
}

// Function to show sections
function showSection(section) {
    document.getElementById('tracker').style.display = section === 'tracker' ? 'block' : 'none';
    document.getElementById('calendar').style.display = section === 'calendar' ? 'block' : 'none';
}

// Load stored moods and background on page load
updateMoodHistory();
updateCalendar();
