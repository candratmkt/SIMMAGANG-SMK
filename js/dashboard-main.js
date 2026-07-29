/**
 * Logika Sesi, Fetch Profil, Saklar Tampilan Role, & Logout
 */

async function loadDashboard() {
    const loader = document.getElementById('loaderOverlay');
    
    try {
        if (!supabaseClient) {
            alert("Gagal terhubung ke server Supabase!");
            return;
        }

        // 1. Cek Sesi Login User
        const { data: { session }, error: sessionErr } = await supabaseClient.auth.getSession();

        if (sessionErr || !session) {
            window.location.href = 'login.html';
            return;
        }

        const user = session.user;

        // 2. Ambil Profil Pengguna
        const { data: profile, error: profileErr } = await supabaseClient
            .from('profiles')
            .select('full_name, role, email, is_active')
            .eq('id', user.id)
            .maybeSingle();

        if (profileErr) {
            console.error("Gagal mengambil data profil:", profileErr.message);
        }

        const namaLengkap = profile?.full_name || user.email.split('@')[0];
        const emailUser = profile?.email || user.email;
        const roleRaw = (profile?.role || 'siswa').toLowerCase();

        // Render Data ke DOM
        document.getElementById('navUserName').innerText = namaLengkap;
        document.getElementById('welcomeName').innerText = namaLengkap;
        document.getElementById('userEmailText').innerText = emailUser;
        document.getElementById('infoNama').innerText = namaLengkap;
        document.getElementById('infoEmail').innerText = emailUser;
        document.getElementById('infoRole').innerText = roleRaw;
        document.getElementById('infoUUID').innerText = user.id;

        // 3. Render Tampilan Sesuai Role
        renderRoleUI(roleRaw);

    } catch (err) {
        console.error("Terjadi kesalahan saat memuat dashboard:", err);
    } finally {
        if (loader) {
            loader.style.display = 'none';
        }
    }
}

// Fungsi Pengatur Tampilan Sesuai Peran
function renderRoleUI(role) {
    const roleBadge = document.getElementById('userRoleBadge');
    
    document.querySelectorAll('.role-section').forEach(el => el.classList.add('d-none'));

    if (role === 'siswa') {
        roleBadge.className = 'badge bg-warning text-dark badge-role mb-2';
        roleBadge.innerText = 'SISWA MAGANG';
        document.getElementById('roleSiswaSection').classList.remove('d-none');
    } 
    else if (role === 'guru' || role === 'pembimbing_sekolah') {
        roleBadge.className = 'badge bg-info text-dark badge-role mb-2';
        roleBadge.innerText = 'GURU PEMBIMBING';
        document.getElementById('roleGuruSection').classList.remove('d-none');
    } 
    else if (role === 'dudi' || role === 'pembimbing_dudi') {
        roleBadge.className = 'badge bg-success text-white badge-role mb-2';
        roleBadge.innerText = 'PEMBIMBING DUDI';
        document.getElementById('roleDudiSection').classList.remove('d-none');
    } 
    else if (role === 'admin') {
        roleBadge.className = 'badge bg-danger text-white badge-role mb-2';
        roleBadge.innerText = 'ADMINISTRATOR SMK';
        document.getElementById('roleAdminSection').classList.remove('d-none');
    } 
    else {
        roleBadge.className = 'badge bg-secondary text-white badge-role mb-2';
        roleBadge.innerText = role;
        document.getElementById('roleSiswaSection').classList.remove('d-none');
    }
}

// Logout Handler
async function handleLogout() {
    if (confirm("Apakah Anda yakin ingin keluar dari sistem SIMMAGANG?")) {
        await supabaseClient.auth.signOut();
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', loadDashboard);