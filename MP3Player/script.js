class AudioPlayer {
    constructor() {
        this.audioElement = document.querySelector('#audio');
        this.titleElement = document.querySelector('.current-song-title');
        this.prevButton = document.querySelector('.prev');
        this.playButton = document.querySelector('.play');
        this.nextButton = document.querySelector('.next');
        this.shuffleButton = document.querySelector('.shuffle');
        this.repeatButton = document.querySelector('.repeat');
        this.darkModeToggle = document.querySelector('.dark-mode-toggle');
        this.fileInput = document.querySelector('#audio-file-input');
        this.playlistElement = document.querySelector('.playlist');

        this.audioFiles = [];
        this.currentFileIndex = null;
        this.shuffle = false;
        this.repeat = false;

        this.setupEventListeners();
        this.handleDarkMode();
    }

    setupEventListeners() {
        this.prevButton.addEventListener('click', () => this.prevTrack());
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.nextButton.addEventListener('click', () => this.nextTrack());
        this.shuffleButton.addEventListener('click', () => this.toggleShuffle());
        this.repeatButton.addEventListener('click', () => this.toggleRepeat());
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        this.fileInput.addEventListener('change', (event) => this.handleFileInputChange(event));
        this.audioElement.addEventListener('ended', () => this.handleSongEnded());
    }

    handleFileInputChange(event) {
        const files = Array.from(event.target.files);
        this.audioFiles = files;
        this.currentFileIndex = 0;
        this.updatePlaylist();
        this.loadTrack();
    }

    updatePlaylist() {
        this.playlistElement.innerHTML = '';
        this.audioFiles.forEach((file, index) => {
            const listItem = document.createElement('div');
            listItem.classList.add('playlistItem');
            listItem.textContent = file.name;
            listItem.addEventListener('click', () => {
                this.currentFileIndex = index;
                this.loadTrack();
            });

            this.playlistElement.appendChild(listItem);
        });
    }

    loadTrack() {
        const file = this.audioFiles[this.currentFileIndex];
        const url = URL.createObjectURL(file);
        this.audioElement.src = url;
        this.titleElement.textContent = file.name;
        this.play();
        this.highlightCurrentTrackInPlaylist();
    }

    highlightCurrentTrackInPlaylist() {
        const playlistItems = Array.from(this.playlistElement.children);
        playlistItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === this.currentFileIndex) {
                item.classList.add('active');
            }
        });
    }

    play() {
        this.audioElement.play();
        this.playButton.classList.add('active');
    }

    pause() {
        this.audioElement.pause();
        this.playButton.classList.remove('active');
    }

    togglePlay() {
        if (this.audioElement.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    nextTrack() {
        if (this.shuffle) {
            this.currentFileIndex = Math.floor(Math.random() * this.audioFiles.length);
        } else {
            this.currentFileIndex = (this.currentFileIndex + 1) % this.audioFiles.length;
        }
        this.loadTrack();
    }

    prevTrack() {
        if (this.shuffle) {
            this.currentFileIndex = Math.floor(Math.random() * this.audioFiles.length);
        } else {
            this.currentFileIndex = (this.currentFileIndex - 1 + this.audioFiles.length) % this.audioFiles.length;
        }
        this.loadTrack();
    }

    toggleShuffle() {
        this.shuffle = !this.shuffle;
        this.shuffleButton.classList.toggle('active');
    }

    toggleRepeat() {
        this.repeat = !this.repeat;
        this.repeatButton.classList.toggle('active');
    }

    handleSongEnded() {
        if (this.repeat) {
            this.loadTrack();
        } else {
            this.nextTrack();
        }
    }

    handleDarkMode() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDarkMode) {
            document.body.classList.add('dark');
        }
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new AudioPlayer();
});
