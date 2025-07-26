

// Default wallpapers
const defaultWallpapers = [
    './images/wallpaper1.webp',
    './images/wallpaper2.webp',
    './images/wallpaper3.webp',
    './images/wallpaper4.webp',
    './images/wallpaper5.webp',
    './images/wallpaper6.webm',
    './images/wallpaper7.webm',
    './images/wallpaper8.webm'
];

// Helper function to determine if wallpaper is video
function isVideo(url) {
    const lowerUrl = url.toLowerCase();
    return lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm');
}

// Function to fetch quote from API
async function fetchQuote() {
    try {
        // Fetch 20 quotes
        const response = await fetch('https://animechan.vercel.app/api/quotes/anime?page=1&per_page=20');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const quotes = await response.json();
        
        // Randomly select one quote from the array
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        
        console.log('Selected random quote:', randomQuote);
        
        return {
            text: randomQuote.quote,
            author: `${randomQuote.character} (${randomQuote.anime})`
        };
    } catch (error) {
        console.error('Failed to fetch quote:', error);
        // Fallback quotes array in case API fails
        const fallbackQuotes = [
            {
                text: "Believe in yourself. Not in the you who believes in me. Not the me who believes in you. Believe in the you who believes in yourself.",
                author: "Kamina (Gurren Lagann)"
            },
            {
                text: "If you don't take risks, you can't create a future.",
                author: "Monkey D. Luffy (One Piece)"
            },
            {
                text: "The world isn't perfect. But it's there for us, doing the best it can.",
                author: "Saitama (One Punch Man)"
            },
            {
                text: "Sometimes I do feel like I'm a failure. Like there's no hope for me. But even so, I'm not gonna give up. Ever!",
                author: "Izuku Midoriya (My Hero Academia)"
            },
            {
                text: "The only ones who should kill, are those who are prepared to be killed.",
                author: "Lelouch Lamperouge (Code Geass)"
            },
            {
                text: "Whatever you lose, you'll find it again. But what you throw away you'll never get back.",
                author: "Himura Kenshin (Rurouni Kenshin)"
            },
            {
                text: "Fear is not evil. It tells you what weakness is. And once you know your weakness, you can become stronger as well as kinder.",
                author: "Gildarts Clive (Fairy Tail)"
            },
            {
                text: "It's not the face that makes someone a monster; it's the choices they make with their lives.",
                author: "Naruto Uzumaki (Naruto)"
            },
            {
                text: "People's lives don't end when they die. It ends when they lose faith.",
                author: "Itachi Uchiha (Naruto)"
            },
            {
                text: "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.",
                author: "Naruto Uzumaki (Naruto)"
            },
            {
                text: "Life is not a game of luck. If you wanna win, work hard.",
                author: "Sora (No Game No Life)"
            },
            {
                text: "The world is not beautiful, therefore it is.",
                author: "Kino (Kino's Journey)"
            },
            {
                text: "Being weak is nothing to be ashamed of... Staying weak is!",
                author: "Fuegoleon Vermillion (Black Clover)"
            },
            {
                text: "Power comes in response to a need, not a desire.",
                author: "Goku (Dragon Ball Z)"
            },
            {
                text: "To know sorrow is not terrifying. What is terrifying is to know you can't go back to happiness you could have.",
                author: "Matsumoto Rangiku (Bleach)"
            },
            {
                text: "Giving up kills people. When people reject giving up... they finally win the right to transcend humanity.",
                author: "Alucard (Hellsing)"
            },
            {
                text: "A person can change, at the moment when the person wishes to change.",
                author: "Haruhi Fujioka (Ouran High School Host Club)"
            },
            {
                text: "Vision is not seeing things as they are, but as they will be.",
                author: "Edward Newgate (One Piece)"
            },
            {
                text: "Sometimes the questions are complicated and the answers are simple.",
                author: "L Lawliet (Death Note)"
            },
            {
                text: "The ticket to the future is always open.",
                author: "Vash the Stampede (Trigun)"
            }
        ];
        const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        return randomFallback;
    }
}

// Function to set quote
async function updateQuote() {
    try {
        console.log('Updating quote...');
        const quote = await fetchQuote();
        setQuote(quote.text, quote.author);
    } catch (error) {
        console.error('Error updating quote:', error);
    }
}

// Function to set quote text
function setQuote(text, author) {
    console.log('Setting quote:', { text, author });
    quoteElement.textContent = `"${text}"`;
    quoteAuthorElement.textContent = `- ${author}`;
}

// Function to get random quote
function getRandomQuote() {
    // This function is no longer needed as quotes are fetched from API
    // Keeping it for now in case it's called elsewhere, but it will always return a default quote
    return { text: "If you don't take risks, you can't create a future.", author: "Monkey D. Luffy" };
}

// DOM Elements
const settingsBtn = document.querySelector('.settings-btn');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.querySelector('.close');
const resetSettingsBtn = document.getElementById('resetSettings');
const quoteElement = document.querySelector('.quote');
const quoteAuthorElement = document.querySelector('.quote-author');
const backgroundWrapper = document.querySelector('.background-wrapper');
const clockContainer = document.querySelector('.clock-container');
const quoteContainer = document.querySelector('.quote-container');
const toggleTimeDate = document.getElementById('toggleTimeDate');
const toggleQuote = document.getElementById('toggleQuote');

// Load saved settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('dashboardSettings') || '{}');
    
    // Time and date visibility
    const showTimeDate = settings.showTimeDate !== false; // Default to true
    toggleTimeDate.checked = showTimeDate;
    clockContainer.classList.toggle('hidden', !showTimeDate);
    
    // Quote visibility
    const showQuote = settings.showQuote !== false; // Default to true
    toggleQuote.checked = showQuote;
    quoteContainer.classList.toggle('hidden', !showQuote);
}

// Save settings
function saveSettings() {
    const settings = {
        showTimeDate: toggleTimeDate.checked,
        showQuote: toggleQuote.checked
    };
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
}

// Function to update clock
function updateClock() {
    const now = new Date();
    const timeElement = document.querySelector('.time');
    const dateElement = document.querySelector('.date');
    
    // Format time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    
    // Update DOM
    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
}

// Function to set background wallpaper
function setWallpaper(url) {
    console.log('Setting wallpaper:', url);
    
    // Show loading state
    backgroundWrapper.style.opacity = '0';
    
    // Remove any existing video elements
    const existingVideo = backgroundWrapper.querySelector('video');
    if (existingVideo) {
        existingVideo.remove();
    }
    
    if (isVideo(url)) {
        // Create and set up video element
        const video = document.createElement('video');
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.style.position = 'absolute';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.left = '0';
        video.style.top = '0';
        video.style.zIndex = '-1';
        
        video.oncanplay = function() {
            backgroundWrapper.style.backgroundImage = 'none';
            backgroundWrapper.appendChild(video);
            backgroundWrapper.style.opacity = '1';
            console.log('Video wallpaper loaded successfully');
        };
        
        video.onerror = function() {
            console.error('Failed to load video wallpaper:', url);
            // Use first non-video wallpaper as fallback
            const fallbackUrl = defaultWallpapers.find(w => !isVideo(w));
            setWallpaper(fallbackUrl);
        };
        
        video.src = url;
    } else {
        // Handle image wallpaper
    const img = new Image();
    img.onload = function() {
        backgroundWrapper.style.backgroundImage = `url(${url})`;
        backgroundWrapper.style.opacity = '1';
            console.log('Image wallpaper loaded successfully');
    };
    
    img.onerror = function() {
            console.error('Failed to load image wallpaper:', url);
            // Use first non-video wallpaper as fallback
            const fallbackUrl = defaultWallpapers.find(w => !isVideo(w));
        backgroundWrapper.style.backgroundImage = `url(${fallbackUrl})`;
        backgroundWrapper.style.opacity = '1';
    };
    
    img.src = url;
    }
}

// Function to load random wallpaper
function loadRandomWallpaper() {
    const randomIndex = Math.floor(Math.random() * defaultWallpapers.length);
    const wallpaperUrl = defaultWallpapers[randomIndex];
    setWallpaper(wallpaperUrl);
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Initializing dashboard...');
    
    // Load saved settings
    loadSettings();
    
    // Update clock immediately and start interval
    updateClock();
    setInterval(updateClock, 1000);
    
    // Set initial random quote and wallpaper
    await updateQuote(); // Wait for quote to be fetched
    loadRandomWallpaper();
    
    // Settings button click handler
    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });
    
    // Close modal button
    closeModal.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
    
    // Toggle handlers
    toggleTimeDate.addEventListener('change', () => {
        clockContainer.classList.toggle('hidden', !toggleTimeDate.checked);
        saveSettings();
    });
    
    toggleQuote.addEventListener('change', () => {
        quoteContainer.classList.toggle('hidden', !toggleQuote.checked);
        saveSettings();
    });
    
    // Reset settings
    resetSettingsBtn.addEventListener('click', async () => {
        // Reset visibility
        toggleTimeDate.checked = true;
        toggleQuote.checked = true;
        clockContainer.classList.remove('hidden');
        quoteContainer.classList.remove('hidden');
        
        // Reset content
        await updateQuote(); // Wait for quote to be fetched
        loadRandomWallpaper();
        
        // Save default settings
        saveSettings();
        
        // Close modal
        settingsModal.style.display = 'none';
    });
    
    // Double click anywhere to change wallpaper
    document.addEventListener('dblclick', () => {
        loadRandomWallpaper();
    });
});