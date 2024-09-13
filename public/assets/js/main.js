document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('downloadForm');
    const button = document.getElementById('downloadButton');

    button.addEventListener('click', () => {
        form.submit();
    });
});
