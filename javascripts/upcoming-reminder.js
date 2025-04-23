//set the reminder Function to 
function setReleaseReminder(gameId, gameName, releaseDate) {
    // Store the reminder
    const reminder = {
        id: gameId,
        name: gameName,
        releaseDate: releaseDate
    };
    
    localStorage.setItem(`gameReminder_${gameId}`, JSON.stringify(reminder));
    
    // days calculator
    const releaseDay = new Date(releaseDate);
    const today = new Date();
    const daysUntil = Math.ceil((releaseDay - today) / (1000 * 60 * 60 * 24));
    
    // Showing the confirmation
    showToast(
        "Reminder Set!", 
        `We'll remind you when ${gameName} releases in ${daysUntil} days.`
    );
    
    // Understand wether immediately show release notification (if release date = today)
    checkGameReleases();
}

// toast notification show function-------------------------------------------------------------------------------------------------
function showToast(title, message, duration = 5000) {
    // Creating toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add to  the document
    document.body.appendChild(toast);
    
    // Triggering animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Removing automaticall after time passed
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Game release date checking function
function checkGameReleases() {
    // in YYYY-MM-DD format Get the present date 
    const today = new Date().toISOString().split('T')[0]; 
    
    // Stored reminders checking
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        if (key.startsWith('gameReminder_')) {
            try {
                const reminder = JSON.parse(localStorage.getItem(key));
                
                // check whether today is the release date
                if (reminder.releaseDate === today) {
                    showToast(
                        "Game Released Today!", 
                        `${reminder.name} is now available! Check it out!`,
                        10000 // Showing time = 10 s
                    );
                }
            } catch (e) {
                console.error("Error parsing reminder:", e);
            }
        }
    }
}

// Check releases when page loads
document.addEventListener('DOMContentLoaded', checkGameReleases);

// If user keep the tab open checking all day
setInterval(checkGameReleases, 1000 * 60 * 60); // Check every hour
