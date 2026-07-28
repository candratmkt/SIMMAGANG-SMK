// UI Helpers
export function showAlert(containerId, message, type = 'danger') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show small" role="alert">
            <i class="fa-solid fa-circle-info me-2"></i> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

export function setLoading(btnId, isLoading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const text = btn.querySelector('#btnText');
    const spinner = btn.querySelector('#btnSpinner');

    if (isLoading) {
        btn.disabled = true;
        if (text) text.classList.add('d-none');
        if (spinner) spinner.classList.remove('d-none');
    } else {
        btn.disabled = false;
        if (text) text.classList.remove('d-none');
        if (spinner) spinner.classList.add('d-none');
    }
}
