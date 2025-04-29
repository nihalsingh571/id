document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('idCardForm');
    const photoInput = document.getElementById('photo');
    const previewPhoto = document.getElementById('previewPhoto');
    const previewName = document.getElementById('previewName');
    const previewIdNumber = document.getElementById('previewIdNumber');
    const previewDob = document.getElementById('previewDob');
    const previewAddress = document.getElementById('previewAddress');

    // Handle photo preview
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewPhoto.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Handle form input changes
    form.addEventListener('input', function(e) {
        const target = e.target;
        switch(target.id) {
            case 'name':
                previewName.textContent = target.value;
                break;
            case 'idNumber':
                previewIdNumber.textContent = target.value;
                break;
            case 'dob':
                previewDob.textContent = target.value;
                break;
            case 'address':
                previewAddress.textContent = target.value;
                break;
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the data to a server
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // For demonstration, we'll just log the data
        console.log('Form submitted with data:', data);
        
        // Show success message
        alert('ID Card details submitted successfully!');
    });
}); 