

// Safely parse localStorage data
let selectedMood = '';

let moods = localStorage.getItem('moods');
moods = moods ? JSON.parse(moods) : {}; // Only parse if there's valid data

// Function to select a mood
function selectMood(emoji) {
    selectedMood = emoji;
    changeBackground(emoji);
}

function changeBackground(emoji) {
    const body = document.body;
    const colors = {
        '😊': '#ffeb3b',  // Yellow
        '😢': '#90caf9',  // Light Blue
        '😐': '#bdbdbd',  // Gray
        '🤩': '#ff9800',  // Orange
        '😡': '#f44336'   // Red
    };
    body.style.backgroundColor = colors[emoji] || '#ffffff'; // Default to white if no match
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

// Load stored moods on page load
updateMoodHistory();
updateCalendar();

