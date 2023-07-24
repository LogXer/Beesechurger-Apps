document.getElementById('start-button').addEventListener('click', startTimer);

function startTimer() {
    const topPart = document.querySelector('.top-part');
    const bottomPart = document.querySelector('.bottom-part');
    const hourglass = document.querySelector('.hourglass');
    const duration = document.getElementById('timer-input').value;
    const interval = 10; 

    let elapsed = 0;
    const totalSteps = duration * 1000 / interval;

    const timer = setInterval(() => {
        elapsed++;
        if (elapsed >= totalSteps) {
            clearInterval(timer);
            topPart.style.height = '0%';
            bottomPart.style.height = '100%';
            hourglass.style.backgroundColor = '#FF0000'; 
            setTimeout(() => {
                hourglass.style.backgroundColor = '#000'; 
            }, 1000);
        } else {
            topPart.style.height = `${50 - (50 * elapsed / totalSteps)}%`;
            bottomPart.style.height = `${50 * elapsed / totalSteps}%`;
        }
    }, interval);
}
