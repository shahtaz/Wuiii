document.querySelectorAll('.playSound').forEach(function(element) {
    const clickCountElement = element.nextElementSibling;
    const id = element.id;

    let currentCount = parseInt(localStorage.getItem(id)) || 0;
    clickCountElement.textContent = currentCount;

    element.addEventListener('click', function() {
        var audio = document.getElementById('soundEffect');
        if (!audio.paused) return; 

        var audioSource = document.getElementById('audioSource');
        audioSource.src = element.getAttribute('data-sound');
        audio.load();
        audio.play();

        currentCount += 1;
        clickCountElement.textContent = currentCount;

        localStorage.setItem(id, currentCount);

        element.style.pointerEvents = 'none';
        audio.onended = function() {
            element.style.pointerEvents = 'auto';
            sortImagesByClicks();
        };
    });
});

function sortImagesByClicks() {
    const grid = document.querySelector('.image-grid');
    const images = Array.from(document.querySelectorAll('.image-container'));

    images.sort((a, b) => {
        const countA = parseInt(a.querySelector('.click-count').textContent);
        const countB = parseInt(b.querySelector('.click-count').textContent);
        return countB - countA;
    });

    images.forEach((image, index) => {
        image.style.order = index; 
        grid.appendChild(image);   
    });
}

// Password functionality
const correctPasscode = "ustaaad"; 

document.getElementById('resetButton').addEventListener('click', function() {
    const passwordInput = document.getElementById('passwordInput').value;
    if (passwordInput === correctPasscode) {
        // Reset click counts and localStorage
        document.querySelectorAll('.click-count').forEach(countElement => {
            countElement.textContent = '0';
            const imageId = countElement.previousElementSibling.id;
            localStorage.setItem(imageId, '0');
        });
        sortImagesByClicks(); 
    } else {
        alert('Incorrect passcode!');
    }
});
