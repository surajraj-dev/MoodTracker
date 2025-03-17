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
    body.style.backgroundColor = colors[emoji]; // Default color
}

const moods = {};
let selectedMood = '';

function addMood() {
    if (!selectedMood) {
        alert('Please select a mood!');
        return;
    }
    const dateInput = document.getElementById('mood-date').value;
    const today = dateInput || new Date().toISOString().split('T')[0];

    moods[today] = selectedMood; // Store in memory
    updateMoodHistory();
    updateCalendar(); // Update calendar after adding mood
    selectedMood = ''; // Reset mood
}

function updateMoodHistory() {
    const historyDiv = document.getElementById('mood-history');
    historyDiv.innerHTML = '';
    for (const [date, mood] of Object.entries(moods)) {
        historyDiv.innerHTML += `<div class="mood-entry">${date} - ${mood}</div>`;
    }
}

// Function  calendar view


// Function to show sections
function showSection(section) {
    document.getElementById('tracker').style.display = section === 'tracker' ? 'block' : 'none';
    document.getElementById('calendar').style.display = section === 'calendar' ? 'block' : 'none';
}

updateMoodHistory();
