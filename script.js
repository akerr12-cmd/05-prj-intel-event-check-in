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

// Function to display the attendee list
function displayAttendeeList() {
  const attendeeListElement = document.getElementById('attendeeList');
  attendeeListElement.innerHTML = '';

  for (let i = 0; i < attendeeList.length; i++) {
    const attendee = attendeeList[i];
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="attendee-name">${attendee.name}</span><span class="attendee-team">${attendee.team}</span>`;
    attendeeListElement.appendChild(listItem);
  }
}

// Function to create confetti
function createConfetti() {
  const confettiContainer = document.getElementById('confettiContainer');
  const colors = ['#ff6b6b', '#ffd700', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    confettiContainer.appendChild(confetti);
  }
}

// Load data when the page loads
loadDataFromStorage();

// Function to reset all data
function resetAllData() {
  // Clear all variables
  attendeeCount = 0;
  waterCount = 0;
  zeroCount = 0;
  powerCount = 0;
  attendeeList = [];

  // Update the page with reset values
  document.getElementById('attendeeCount').textContent = 0;
  document.getElementById('waterCount').textContent = 0;
  document.getElementById('zeroCount').textContent = 0;
  document.getElementById('powerCount').textContent = 0;

  // Reset the progress bar
  document.getElementById('progressBar').style.width = '0%';

  // Clear the attendee list
  document.getElementById('attendeeList').innerHTML = '';

  // Clear the greeting message
  document.getElementById('greeting').textContent = '';

  // Clear localStorage
  localStorage.removeItem('checkInData');
}

// Get the reset button and add a click event listener
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', function() {
  // Ask for confirmation before resetting
  if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
    resetAllData();
  }
});

// Add a submit event listener to the form
checkInForm.addEventListener('submit', function(event) {
  // Prevent the form from refreshing the page
  event.preventDefault();

  // Get the name from the input field
  const attendeeName = document.getElementById('attendeeName').value;

  // Get the team from the dropdown
  const selectedTeam = document.getElementById('teamSelect').value;

  // Increment the counter
  attendeeCount = attendeeCount + 1;

  // Add attendee to the list
  attendeeList.push({
    name: attendeeName,
    team: teamLabels[selectedTeam]
  });

  // Calculate the progress percentage (goal is 20)
  const maxGoal = 20;
  const progressPercentage = (attendeeCount / maxGoal) * 100;

  // Get the full team label
  const fullTeamLabel = teamLabels[selectedTeam];

  // Create a personalized greeting message
  const greetingMessage = `Welcome to ${fullTeamLabel}, ${attendeeName}!`;
  console.log(greetingMessage);

  // Update the attendee count on the page
  document.getElementById('attendeeCount').textContent = attendeeCount;

  // Update the progress bar width
  document.getElementById('progressBar').style.width = progressPercentage + '%';

  // Update the correct team's count on the page
  if (selectedTeam === 'water') {
    waterCount = waterCount + 1;
    document.getElementById('waterCount').textContent = waterCount;
  } else if (selectedTeam === 'zero') {
    zeroCount = zeroCount + 1;
    document.getElementById('zeroCount').textContent = zeroCount;
  } else if (selectedTeam === 'power') {
    powerCount = powerCount + 1;
    document.getElementById('powerCount').textContent = powerCount;
  }

  // Display the success message with name and team
  document.getElementById('greeting').textContent = greetingMessage;

  // Display the attendee list
  displayAttendeeList();

  // Show the welcome popup
  const welcomePopup = document.getElementById('welcomePopup');
  const popupMessage = document.getElementById('popupMessage');
  const teamEmoji = teamEmojis[selectedTeam];
  popupMessage.innerHTML = `<div style="font-size: 32px; margin-bottom: 10px;">${teamEmoji}</div>${greetingMessage}`;
  welcomePopup.classList.add('show');
  welcomePopup.classList.remove('hide');

  // Hide the popup after 3 seconds
  setTimeout(function() {
    welcomePopup.classList.add('hide');
    setTimeout(function() {
      welcomePopup.classList.remove('show');
      welcomePopup.classList.remove('hide');
    }, 400);
  }, 3000);

  // Check if the goal is reached (20 attendees)
  if (attendeeCount === 20) {
    // Find which team has the most attendees
    let winningTeam = '';
    let maxCount = Math.max(waterCount, zeroCount, powerCount);

    if (maxCount === waterCount) {
      winningTeam = 'Team Water Wise';
    } else if (maxCount === zeroCount) {
      winningTeam = 'Team Net Zero';
    } else if (maxCount === powerCount) {
      winningTeam = 'Team Renewables';
    }

    // Show the modal backdrop
    const modalBackdrop = document.getElementById('modalBackdrop');
    modalBackdrop.classList.add('show');

    // Create confetti
    createConfetti();

    // Display the celebration message
    const celebrationPopup = document.getElementById('celebrationPopup');
    const celebrationMessage = document.getElementById('celebrationMessage');
    celebrationMessage.textContent = `🎉 Goal Reached! ${winningTeam} Wins! 🎉`;
    celebrationPopup.classList.add('show');
    celebrationPopup.classList.remove('hide');

    // Hide the celebration popup after 5 seconds
    setTimeout(function() {
      celebrationPopup.classList.add('hide');
      modalBackdrop.classList.remove('show');
      setTimeout(function() {
        celebrationPopup.classList.remove('show');
        celebrationPopup.classList.remove('hide');
        // Clear confetti
        document.getElementById('confettiContainer').innerHTML = '';
      }, 400);
    }, 5000);
  }

  // Save data to localStorage
  saveDataToStorage();

  // Reset the form after submission
  checkInForm.reset();

  // Focus the name field for keyboard-friendly experience
  document.getElementById('attendeeName').focus();

  // Log the values to see them
  console.log(`Name: ${attendeeName}, Team: ${selectedTeam}`);
  console.log(`Total attendees: ${attendeeCount}`);
  console.log(`Progress: ${progressPercentage.toFixed(1)}%`);
});
