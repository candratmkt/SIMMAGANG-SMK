// assets/js/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://pqhnzcsmbytwiurchnzl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxaG56Y3NtYnl0d2l1cmNobnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMjQ2NzIsImV4cCI6MjEwMDgwMDY3Mn0.B5nv0C75tqK0kdD7pB7NxXZGn8CWZz7HgR9mECyrLXE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- SKRIP CEK KONEKSI (Bisa dihapus nanti jika sudah berjalan lancar) ---
(async () => {
    try {
        const { data, error } = await supabase.from('settings').select('key').limit(1);
        if (error) {
            console.warn('⚠️ Supabase terhubung, tapi error query (Cek RLS/Tabel):', error.message);
        } else {
            console.log('🟢 BERHASIL: Frontend terhubung penuh ke Supabase database!');
        }
    } catch (err) {
        console.error('🔴 GAGAL: Tidak bisa terhubung ke Supabase:', err);
    }
})();
