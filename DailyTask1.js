const form = document.getElementById('regForm');
    const themeBtn = document.getElementById('themeToggle');

    // 1. Theme Toggle Logic
    themeBtn.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    });

    // 2. Validation Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset visibility
        document.querySelectorAll('.error-text').forEach(el => el.style.visibility = 'hidden');

        // Field Selectors
        const fields = {
            fullname: document.getElementById('fullname').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            course: document.getElementById('course').value,
            pass: document.getElementById('password').value,
            confirm: document.getElementById('confirmPassword').value
        };

        // Name Validation
        if (!fields.fullname) {
            showError('nameError');
            isValid = false;
        }

        // Email Validation (Regex)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(fields.email)) {
            showError('emailError');
            isValid = false;
        }

        // Phone Validation (10 digits)
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(fields.phone)) {
            showError('phoneError');
            isValid = false;
        }

        // Course Validation
        if (!fields.course) {
            showError('courseError');
            isValid = false;
        }

        // Password Validation
        if (fields.pass.length < 6) {
            showError('passError');
            isValid = false;
        }

        if (fields.pass !== fields.confirm || !fields.confirm) {
            showError('confirmError');
            isValid = false;
        }

        if (isValid) {
            // Optional: Local Storage
            localStorage.setItem('studentRegistration', JSON.stringify(fields));
            
            // Show Success
            document.getElementById('success-msg').style.display = 'block';
            form.reset();
            setTimeout(() => {
                document.getElementById('success-msg').style.display = 'none';
            }, 3000);
        }
    });

    function showError(id) {
        document.getElementById(id).style.visibility = 'visible';
    }

    // Reset button also clears errors
    document.getElementById('resetBtn').addEventListener('click', () => {
        document.querySelectorAll('.error-text').forEach(el => el.style.visibility = 'hidden');
        document.getElementById('success-msg').style.display = 'none';
    });
