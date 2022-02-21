// TODO: SUBMIT FORM TO API
(function() {
    const form = document.querySelector('form');
    
    form.onsubmit = async e => {
        e.preventDefault();
        let response = await fetch('/api/convert/audio');
        response = response.json();
    }
})();