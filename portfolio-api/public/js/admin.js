document.addEventListener('DOMContentLoaded', function() {
    // Image preview
    const imageInput = document.querySelector('input[type="file"]');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const preview = document.createElement('img');
            preview.style.maxWidth = '200px';
            preview.style.marginTop = '10px';
            
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
            }
            
            if (this.files[0]) {
                reader.readAsDataURL(this.files[0]);
                this.parentNode.appendChild(preview);
            }
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Create or update error message
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-text')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-text');
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                    errorMsg.textContent = `${field.name} is required`;
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-text')) {
                        errorMsg.remove();
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // Delete confirmation
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                e.preventDefault();
            }
        });
    });

    // Dynamic skill level display
    const skillLevel = document.querySelector('#proficiency');
    if (skillLevel) {
        const createStarRating = (level) => {
            const container = document.createElement('div');
            container.classList.add('star-rating-preview');
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('span');
                star.textContent = i < level ? '★' : '☆';
                star.style.color = i < level ? '#ffc107' : '#dee2e6';
                container.appendChild(star);
            }
            return container;
        };

        skillLevel.addEventListener('change', function() {
            const level = parseInt(this.value);
            let preview = this.nextElementSibling;
            if (!preview || !preview.classList.contains('star-rating-preview')) {
                preview = createStarRating(level);
                this.parentNode.insertBefore(preview, this.nextSibling);
            } else {
                preview.replaceWith(createStarRating(level));
            }
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.project-card, .skill-card');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
});