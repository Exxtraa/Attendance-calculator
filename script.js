// Get input elements
const totalClassesInput = document.getElementById('totalClasses');
const presentClassesInput = document.getElementById('presentClasses');
const currentAttendanceDisplay = document.getElementById('currentAttendance');
const requiredClassesDisplay = document.getElementById('requiredClasses');

// Add input event listeners
totalClassesInput.addEventListener('input', updateAll);
presentClassesInput.addEventListener('input', updateAll);

function updateAll() {
    updateAttendance();
    calculateBunkableClasses();
}

function updateAttendance() {
    const totalClasses = parseInt(totalClassesInput.value) || 0;
    const presentClasses = parseInt(presentClassesInput.value) || 0;

    if (totalClasses === 0) {
        currentAttendanceDisplay.textContent = '0%';
        return;
    }

    if (presentClasses > totalClasses) {
        presentClassesInput.value = totalClasses;
        return;
    }

    const attendance = (presentClasses / totalClasses) * 100;
    currentAttendanceDisplay.textContent = `${attendance.toFixed(2)}%`;
}

function calculateBunkableClasses() {
    const totalClasses = parseInt(totalClassesInput.value) || 0;
    const presentClasses = parseInt(presentClassesInput.value) || 0;
    
    if (totalClasses === 0 || presentClasses === 0) {
        requiredClassesDisplay.textContent = '';
        return;
    }

    const currentAttendance = (presentClasses / totalClasses) * 100;
    
    // Calculate classes that can be bunked while maintaining 75%
    let bunkableClasses = 0;
    let tempTotal = totalClasses;
    let tempPresent = presentClasses;
    
    while (((tempPresent) / (tempTotal + 1)) * 100 >= 75) {
        bunkableClasses++;
        tempTotal++;
    }

    if (bunkableClasses > 0) {
        requiredClassesDisplay.textContent = `You can skip ${bunkableClasses} upcoming classes while maintaining 75% attendance`;
    } else {
        requiredClassesDisplay.textContent = `You need to attend more classes to be able to skip any`;
    }
}

function calculateRequired(targetPercentage) {
    const totalClasses = parseInt(totalClassesInput.value) || 0;
    const presentClasses = parseInt(presentClassesInput.value) || 0;

    if (totalClasses === 0) {
        requiredClassesDisplay.textContent = 'Please enter total number of classes';
        return;
    }

    const currentPercentage = (presentClasses / totalClasses) * 100;

    if (currentPercentage >= targetPercentage) {
        const extraClasses = Math.floor((presentClasses - (targetPercentage/100 * totalClasses)) / (targetPercentage/100));
        requiredClassesDisplay.textContent = `You can skip ${extraClasses} upcoming classes while maintaining ${targetPercentage}% attendance`;
        return;
    }

    // Calculate required classes
    let additionalClasses = 0;
    let newTotal = totalClasses;
    
    while ((presentClasses + additionalClasses) / newTotal * 100 < targetPercentage) {
        additionalClasses++;
        newTotal++;
    }

    requiredClassesDisplay.textContent = `You need to attend ${additionalClasses} more classes to reach ${targetPercentage}% attendance`;
}
