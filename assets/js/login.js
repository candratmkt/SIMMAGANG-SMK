import { loginUser, redirectByRole, getCurrentUser } from './auth.js';
import { showAlert, setLoading } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Cek jika sudah login
    const existingUser = getCurrentUser();
    if (existingUser) {
        redirectByRole(existingUser.role);
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    // Toggle Password Visibility
    togglePasswordBtn?.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        eyeIcon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    });

    // Form Submit Handler
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        setLoading('btnLogin', true);
        const { user, error } = await loginUser(email, password);
        setLoading('btnLogin', false);

        if (error) {
            showAlert('alertContainer', error, 'danger');
        } else {
            showAlert('alertContainer', 'Login berhasil! Mengalihkan...', 'success');
            setTimeout(() => redirectByRole(user.role), 1000);
        }
    });
});

// Quick Login Demo function attached to window
window.quickLogin = function(role) {
    document.getElementById('email').value = `${role}@smk.sch.id`;
    document.getElementById('password').value = 'password123';
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
};
