document.addEventListener('DOMContentLoaded', function () {
    const progressBar = document.querySelector('progress');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');

    incrementButton.addEventListener('click', function () {
        if (progressBar.value < progressBar.max) {
            progressBar.value += 10;
        }
    });

    decrementButton.addEventListener('click', function () {
        if (progressBar.value > 0) {
            progressBar.value -= 10;
        }
    });

    const imageSelection = document.querySelector('#image-selection');
    const imageDisplay = document.querySelector('#image-display');

    imageSelection.addEventListener('change', function () {
        const selectedOption = imageSelection.options[imageSelection.selectedIndex];
        const selectedValue = selectedOption.value;

        const imageSources = {
            '1': 'https://th.bing.com/th?id=OIP.1YM53mG10H_U25iPjop83QHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
            '2': 'https://th.bing.com/th?id=OIP.4siKIW3oZ4kEo0vkEVQ5hgHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
            '3': 'https://th.bing.com/th?id=OIP.c4MCiDFgSGLsR_7-4-j0PwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
        };

        if (imageSources[selectedValue]) {
            imageDisplay.src = imageSources[selectedValue];
        }
    });
});