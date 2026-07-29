// Konfigurasi Global Client Supabase
const SUPABASE_URL = 'https://pqhnzcsmbytwiurchnzl.supabase.co/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxaG56Y3NtYnl0d2l1cmNobnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMjQ2NzIsImV4cCI6MjEwMDgwMDY3Mn0.B5nv0C75tqK0kdD7pB7NxXZGn8CWZz7HgR9mECyrLXE';

let supabaseClient;

try {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.error("Library Supabase belum dimuat di HTML!");
    }
} catch (err) {
    console.error("Gagal menginisialisasi Supabase Client:", err);
}
