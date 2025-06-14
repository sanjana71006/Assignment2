
// Set greeting based on time of day
function setGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    
    document.getElementById('greeting').textContent = greeting;
}

// Play/Pause functionality
let isPlaying = false;
const playPauseBtn = document.querySelector('.play-pause-btn i');

function togglePlayPause() {
    isPlaying = !isPlaying;
    playPauseBtn.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

// Progress bar functionality
function updateProgress(clickEvent) {
    const progressTrack = clickEvent.currentTarget;
    const progressFill = progressTrack.querySelector('.progress-fill');
    const rect = progressTrack.getBoundingClientRect();
    const clickX = clickEvent.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    
    progressFill.style.width = `${percentage}%`;
    
    // Update time (simplified calculation)
    const totalSeconds = 4 * 60 + 15; // 4:15
    const currentSeconds = Math.floor((percentage / 100) * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    
    document.querySelector('.time-current').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Volume control functionality
function updateVolume(clickEvent) {
    const volumeTrack = clickEvent.currentTarget;
    const volumeFill = volumeTrack.querySelector('.volume-fill');
    const rect = volumeTrack.getBoundingClientRect();
    const clickX = clickEvent.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    
    volumeFill.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
}

// Navigation functionality
function setActiveNavItem(clickedItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    clickedItem.classList.add('active');
}

// Like button functionality
function toggleLike() {
    const likeBtn = document.querySelector('.like-btn i');
    const isLiked = likeBtn.classList.contains('fas');
    
    if (isLiked) {
        likeBtn.className = 'far fa-heart';
    } else {
        likeBtn.className = 'fas fa-heart';
    }
}

// Search functionality
function handleSearch(event) {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value;
        console.log('Searching for:', searchTerm);
        // Here you would implement actual search functionality
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set initial greeting
    setGreeting();
    
    // Add event listeners
    document.querySelector('.play-pause-btn').addEventListener('click', togglePlayPause);
    document.querySelector('.progress-track').addEventListener('click', updateProgress);
    document.querySelector('.volume-track').addEventListener('click', updateVolume);
    document.querySelector('.like-btn').addEventListener('click', toggleLike);
    document.querySelector('.search-bar input').addEventListener('keypress', handleSearch);
    
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNavItem(this);
        });
    });
    
    // Play buttons on cards and quick items
    document.querySelectorAll('.play-btn, .card-play-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Playing item');
            // Here you would implement play functionality
        });
    });
    
    // Card click handlers
    document.querySelectorAll('.card, .quick-item').forEach(item => {
        item.addEventListener('click', function() {
            console.log('Clicked on:', this.querySelector('h3, span').textContent);
            // Here you would implement navigation to the item
        });
    });
    
    // Control buttons
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            console.log('Control button clicked:', icon.className);
            // Here you would implement the specific control functionality
        });
    });
    
    // Playlist items
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', function() {
            console.log('Clicked playlist:', this.textContent);
            // Here you would implement playlist navigation
        });
    });
});

// Simulated progress bar animation
setInterval(() => {
    if (isPlaying) {
        const progressFill = document.querySelector('.progress-fill');
        const currentWidth = parseFloat(progressFill.style.width) || 33;
        
        if (currentWidth < 100) {
            progressFill.style.width = `${currentWidth + 0.1}%`;
            
            // Update time display
            const totalSeconds = 4 * 60 + 15; // 4:15
            const currentSeconds = Math.floor((currentWidth / 100) * totalSeconds);
            const minutes = Math.floor(currentSeconds / 60);
            const seconds = currentSeconds % 60;
            
            document.querySelector('.time-current').textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}, 1000);