

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

// Custom wallpapers storage
let customWallpapers = [];
let currentWallpapers = [...defaultWallpapers]; // Current active wallpapers

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

// Upload elements
const wallpaperUpload = document.getElementById('wallpaperUpload');
const customWallpapersList = document.getElementById('customWallpapersList');
const clearCustomWallpapers = document.getElementById('clearCustomWallpapers');
const useOnlyCustom = document.getElementById('useOnlyCustom');
const useAllWallpapers = document.getElementById('useAllWallpapers');
const conversionProgress = document.getElementById('conversionProgress');

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
    
    // Load custom wallpapers
    customWallpapers = settings.customWallpapers || [];
    const wallpaperMode = settings.wallpaperMode || 'all';
    
    updateCurrentWallpapers(wallpaperMode);
    displayCustomWallpapers();
}

// Save settings
function saveSettings() {
    const settings = {
        showTimeDate: toggleTimeDate.checked,
        showQuote: toggleQuote.checked,
        customWallpapers: customWallpapers,
        wallpaperMode: getCurrentWallpaperMode()
    };
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
}

// Custom wallpaper functions
async function handleFileUpload(files) {
    if (files.length === 0) return;
    
    // Show progress indicator
    conversionProgress.style.display = 'block';
    
    try {
        const uploadPromises = Array.from(files).map(async (file) => {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                try {
                    let convertedFile;
                    let convertedType;
                    
                    if (file.type.startsWith('image/')) {
                        // Convert image to WebP
                        convertedFile = await convertImageToWebP(file);
                        convertedType = 'image/webp';
                    } else if (file.type.startsWith('video/')) {
                        // Convert video to WebM
                        convertedFile = await convertVideoToWebM(file);
                        convertedType = 'video/webm';
                    }
                    
                    if (convertedFile) {
                        const wallpaper = {
                            name: getConvertedFileName(file.name, file.type),
                            data: convertedFile,
                            type: convertedType,
                            size: formatFileSize(convertedFile.length * 0.75), // Approximate size from base64
                            originalName: file.name
                        };
                        customWallpapers.push(wallpaper);
                    }
                } catch (error) {
                    console.error('Conversion failed for', file.name, error);
                    // Fallback: use original file
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const wallpaper = {
                            name: file.name,
                            data: e.target.result,
                            type: file.type,
                            size: formatFileSize(file.size),
                            originalName: file.name
                        };
                        customWallpapers.push(wallpaper);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
        
        await Promise.all(uploadPromises);
        
    } catch (error) {
        console.error('Upload process failed:', error);
    } finally {
        // Hide progress indicator
        conversionProgress.style.display = 'none';
        
        // Update UI
        saveSettings();
        displayCustomWallpapers();
        updateCurrentWallpapers();
    }
}

// Convert image to WebP using Canvas API
// Convert image to WebP using Canvas API (works in all modern browsers)
function convertImageToWebP(file, quality = 0.8) {
    return new Promise((resolve) => {
        // If it's already WebP, just return as data URL
        if (file.type === 'image/webp') {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
            return;
        }
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            // Optimize dimensions for web (max 1920x1080)
            let { width, height } = img;
            const maxWidth = 1920;
            const maxHeight = 1080;
            
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            
            if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw and convert to WebP
            ctx.drawImage(img, 0, 0, width, height);
            
            try {
                // Convert to WebP with specified quality
                const webpDataUrl = canvas.toDataURL('image/webp', quality);
                resolve(webpDataUrl);
            } catch (error) {
                console.warn('WebP conversion failed, falling back to JPEG:', error);
                // Fallback to JPEG if WebP is not supported
                const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(jpegDataUrl);
            }
        };
        
        img.onerror = function() {
            console.error('Failed to load image for conversion');
            // Fallback: return original file as data URL
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        };
        
        img.src = URL.createObjectURL(file);
    });
}

// Convert video to WebM using Canvas and MediaRecorder (for supported browsers)
async function convertVideoToWebM(file) {
    try {
        // If it's already WebM, just return as data URL
        if (file.type === 'video/webm') {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        }
        
        // For other formats, we'll use a simplified approach
        // In a real implementation, you'd need a video conversion service
        // For now, we'll just compress the video quality and return as-is
        return await compressVideo(file);
        
    } catch (error) {
        console.error('Video conversion failed:', error);
        // Fallback to original file
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }
}

// Simple video compression using canvas (for smaller file sizes)
async function compressVideo(file) {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        video.onloadedmetadata = function() {
            // Reduce resolution for compression
            const maxWidth = 1280;
            const maxHeight = 720;
            
            let { videoWidth, videoHeight } = video;
            
            if (videoWidth > maxWidth) {
                videoHeight = (videoHeight * maxWidth) / videoWidth;
                videoWidth = maxWidth;
            }
            
            if (videoHeight > maxHeight) {
                videoWidth = (videoWidth * maxHeight) / videoHeight;
                videoHeight = maxHeight;
            }
            
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            
            // For simplicity, just return the original file as data URL
            // In a production environment, you'd implement proper video conversion
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        };
        
        video.src = URL.createObjectURL(file);
    });
}

// Simplified API-based conversion using ConvertAPI (free tier available)
async function convertVideoUsingAPI(file) {
    // Note: You need to sign up at convertapi.com and get a free API key
    // Replace 'your-api-key-here' with your actual API key
    const API_SECRET = 'your-api-key-here';
    
    if (API_SECRET === 'your-api-key-here') {
        console.warn('ConvertAPI key not configured. Using original file.');
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }
    
    try {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('VideoCodec', 'libvpx-vp9');
        formData.append('AudioCodec', 'libvorbis');
        
        const response = await fetch(`https://v2.convertapi.com/convert/mp4/to/webm?Secret=${API_SECRET}`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            const downloadUrl = result.Files[0].Url;
            
            // Download the converted file
            const convertedResponse = await fetch(downloadUrl);
            const blob = await convertedResponse.blob();
            
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(blob);
            });
        } else {
            throw new Error('API conversion failed');
        }
    } catch (error) {
        console.error('API conversion error:', error);
        // Fallback: return original file
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }
}

// Get converted file name
function getConvertedFileName(originalName, originalType) {
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
    
    if (originalType.startsWith('image/')) {
        return nameWithoutExt + '.webp';
    } else if (originalType.startsWith('video/')) {
        return nameWithoutExt + '.webm';
    }
    
    return originalName;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function displayCustomWallpapers() {
    customWallpapersList.innerHTML = '';
    
    if (customWallpapers.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.style.color = 'rgba(255,255,255,0.5)';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '20px';
        emptyMessage.textContent = 'No custom wallpapers uploaded';
        customWallpapersList.appendChild(emptyMessage);
        return;
    }
    
    customWallpapers.forEach((wallpaper, index) => {
        const item = document.createElement('div');
        item.className = 'wallpaper-item';
        
        // Create preview element safely
        let previewElement;
        if (wallpaper.type.startsWith('image/')) {
            previewElement = document.createElement('img');
            previewElement.src = wallpaper.data;
            previewElement.alt = wallpaper.name;
        } else {
            previewElement = document.createElement('video');
            previewElement.src = wallpaper.data;
            previewElement.muted = true;
        }
        
        // Create wallpaper info container
        const infoContainer = document.createElement('div');
        infoContainer.className = 'wallpaper-info';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'wallpaper-name';
        nameDiv.textContent = wallpaper.name;
        
        const sizeDiv = document.createElement('div');
        sizeDiv.className = 'wallpaper-size';
        sizeDiv.textContent = wallpaper.size;
        
        infoContainer.appendChild(nameDiv);
        infoContainer.appendChild(sizeDiv);
        
        // Create remove button safely
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-wallpaper';
        removeBtn.textContent = 'Remove';
        removeBtn.setAttribute('data-index', index.toString());
        removeBtn.addEventListener('click', () => removeCustomWallpaper(index));
        
        // Append all elements
        item.appendChild(previewElement);
        item.appendChild(infoContainer);
        item.appendChild(removeBtn);
        
        customWallpapersList.appendChild(item);
    });
}

function removeCustomWallpaper(index) {
    customWallpapers.splice(index, 1);
    saveSettings();
    displayCustomWallpapers();
    updateCurrentWallpapers();
}

function clearAllCustomWallpapers() {
    customWallpapers = [];
    saveSettings();
    displayCustomWallpapers();
    updateCurrentWallpapers();
}

function updateCurrentWallpapers(mode = null) {
    const wallpaperMode = mode || getCurrentWallpaperMode();
    
    switch(wallpaperMode) {
        case 'custom':
            currentWallpapers = customWallpapers.map(w => w.data);
            break;
        case 'all':
        default:
            currentWallpapers = [...defaultWallpapers, ...customWallpapers.map(w => w.data)];
            break;
    }
}

function getCurrentWallpaperMode() {
    if (useOnlyCustom.classList.contains('active')) return 'custom';
    return 'all';
}

function setWallpaperMode(mode) {
    // Remove active class from all buttons
    document.querySelectorAll('.wallpaper-actions button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set active mode
    if (mode === 'custom') {
        useOnlyCustom.classList.add('active');
    } else {
        useAllWallpapers.classList.add('active');
    }
    
    updateCurrentWallpapers(mode);
    saveSettings();
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
    if (currentWallpapers.length === 0) {
        console.warn('No wallpapers available');
        return;
    }
    const randomIndex = Math.floor(Math.random() * currentWallpapers.length);
    const wallpaperUrl = currentWallpapers[randomIndex];
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
    
    // Upload handlers
    wallpaperUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files);
            e.target.value = ''; // Reset file input
        }
    });
    
    clearCustomWallpapers.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove all custom wallpapers?')) {
            clearAllCustomWallpapers();
        }
    });
    
    useOnlyCustom.addEventListener('click', () => {
        if (customWallpapers.length === 0) {
            alert('Please upload some custom wallpapers first.');
            return;
        }
        setWallpaperMode('custom');
    });
    
    useAllWallpapers.addEventListener('click', () => {
        setWallpaperMode('all');
    });
    
    // Reset settings
    resetSettingsBtn.addEventListener('click', async () => {
        // Reset visibility
        toggleTimeDate.checked = true;
        toggleQuote.checked = true;
        clockContainer.classList.remove('hidden');
        quoteContainer.classList.remove('hidden');
        
        // Reset wallpapers
        customWallpapers = [];
        updateCurrentWallpapers('all');
        displayCustomWallpapers();
        setWallpaperMode('all');
        
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