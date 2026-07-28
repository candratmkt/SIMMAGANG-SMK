import { supabase } from './supabase.js';
import { CONFIG } from './config.js';

// Centralized Auth Handler
export async function loginUser(email, password) {
    // Demo Mode Handler (Fallback jika database belum dikoneksikan)
    if (CONFIG.DEMO_MODE || !supabase) {
        const mockUser = getMockUserByRole(email);
        localStorage.setItem('simmagang_user', JSON.stringify(mockUser));
        return { user: mockUser, error: null };
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Ambil profil & role pengguna
        const { data: profile, error: profileErr } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileErr) throw profileErr;

        const sessionData = {
            id: data.user.id,
            email: data.user.email,
            role: profile.role,
            full_name: profile.full_name
        };

        localStorage.setItem('simmagang_user', JSON.stringify(sessionData));
        return { user: sessionData, error: null };
    } catch (err) {
        return { user: null, error: err.message || 'Gagal melakukan login.' };
    }
}

export function redirectByRole(role) {
    switch (role?.toLowerCase()) {
        case 'admin':
            window.location.href = 'pages/admin/dashboard.html';
            break;
        case 'siswa':
            window.location.href = 'pages/siswa/dashboard.html';
            break;
        case 'guru':
            window.location.href = 'pages/guru/dashboard.html';
            break;
        case 'hubin':
            window.location.href = 'pages/hubin/dashboard.html';
            break;
        default:
            window.location.href = 'login.html';
    }
}

export function getCurrentUser() {
    const userStr = localStorage.getItem('simmagang_user');
    return userStr ? JSON.parse(userStr) : null;
}

export function logoutUser() {
    if (supabase) supabase.auth.signOut();
    localStorage.removeItem('simmagang_user');
    window.location.href = '../../login.html';
}

function getMockUserByRole(roleInput) {
    let role = 'siswa';
    if (roleInput.includes('admin')) role = 'admin';
    else if (roleInput.includes('guru')) role = 'guru';
    else if (roleInput.includes('hubin')) role = 'hubin';

    return {
        id: 'demo-123',
        email: `${role}@smk.sch.id`,
        role: role,
        full_name: `Pengguna Demo (${role.toUpperCase()})`
    };
}
