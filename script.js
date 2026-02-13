// Get the form element
const checkInForm = document.getElementById('checkInForm');

// Create a counter variable
let attendeeCount = 0;

// Create an array to store attendee data
let attendeeList = [];

// Define team labels
const teamLabels = {
  'water': 'Team Water Wise',
  'zero': 'Team Net Zero',
  'power': 'Team Renewables'
};

// Define team emojis
const teamEmojis = {
  'water': '🌊',
  'zero': '🌿',
  'power': '⚡'
};

// Define team count variables
let waterCount = 0;
let zeroCount = 0;
let powerCount = 0;

// Function to save data to localStorage
function saveDataToStorage() {
  const data = {
    attendeeCount: attendeeCount,
    waterCount: waterCount,
    zeroCount: zeroCount,
    powerCount: powerCount,
    attendeeList: attendeeList
  };
  localStorage.setItem('checkInData', JSON.stringify(data));
}

// Function to load data from localStorage
function loadDataFromStorage() {
  const storedData = localStorage.getItem('checkInData');
  if (storedData) {
    const data = JSON.parse(storedData);
    attendeeCount = data.attendeeCount;
    waterCount = data.waterCount;
    zeroCount = data.zeroCount;
    powerCount = data.powerCount;
    attendeeList = data.attendeeList;

    // Update the page with loaded data
    document.getElementById('attendeeCount').textContent = attendeeCount;
    document.getElementById('waterCount').textContent = waterCount;
    document.getElementById('zeroCount').textContent = zeroCount;
    document.getElementById('powerCount').textContent = powerCount;

    // Update the progress bar
    const maxGoal = 20;
    const progressPercentage = (attendeeCount / maxGoal) * 100;
    document.getElementById('progressBar').style.width = progressPercentage + '%';

    // Display the attendee list
    displayAttendeeList();
  }
}

