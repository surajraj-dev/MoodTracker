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
    updateCalendar(currentMonth, currentYear); // Update calendar after adding mood
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

/********************* Calendar with Mood Emojis **********************************/
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let calendarObject = document.getElementById('calendar');

var currentMonth = (new Date()).getMonth();
var currentYear = (new Date()).getFullYear();

function updateCalendar(month, year) {
    calendarObject.innerHTML = `<h2>${months[month]} ${year}</h2>
                                <button onclick="back()">Previous</button>
                                <button onclick="next()">Next</button>`;

    var firstDay = new Date(year, month, 1).getDay();
    var numberOfDays = 32 - new Date(year, month, 32).getDate();

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let theadrow = document.createElement('tr');

    days.forEach(day => {
        let th = document.createElement('th');
        th.textContent = day;
        theadrow.append(th);
    });

    thead.append(theadrow);
    table.append(thead);

    let tbody = document.createElement('tbody');
    let dateCounter = 1;

    for (let wks = 0; wks < 6; wks++) {
        let tr = document.createElement('tr');
        for (let wds = 0; wds < 7; wds++) {
            let td = document.createElement('td');

            if (wks === 0 && wds < firstDay) {
                td.textContent = ''; // Empty cell before first day
            } else if (dateCounter <= numberOfDays) {
                let formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${dateCounter.toString().padStart(2, '0')}`;
                let moodEmoji = moods[formattedDate] || '';
                td.innerHTML = `${dateCounter} ${moodEmoji}`;
                dateCounter++;
            }

            tr.append(td);
        }
        tbody.append(tr);
    }

    table.append(tbody);
    calendarObject.append(table);
}

function next() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar(currentMonth, currentYear);
}

function back() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar(currentMonth, currentYear);
}

updateCalendar(currentMonth, currentYear);
