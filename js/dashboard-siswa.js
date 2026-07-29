/**
 * Logika & Handler Interaksi Khusus Role Siswa
 */

// Handler Absensi Masuk/Pulang
async function handleAbsenSiswa() {
    const btnAbsen = document.getElementById('btnAbsenSiswa');
    const statusText = document.getElementById('statPresensiText');

    if (confirm("Apakah Anda ingin mencatat kehadiran hari ini?")) {
        btnAbsen.disabled = true;
        btnAbsen.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Memproses...`;

        try {
            // Simulasi/Koneksi Absensi ke Supabase
            setTimeout(() => {
                const jamSekarang = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                statusText.innerText = `Hadir (${jamSekarang})`;
                statusText.className = "fw-bold mb-0 text-success";

                btnAbsen.className = "btn btn-outline-success btn-sm w-100 disabled";
                btnAbsen.innerHTML = `<i class="fa-solid fa-circle-check me-1"></i> Sudah Absen (${jamSekarang})`;
                
                alert("Absensi berhasil dicatat!");
            }, 1000);
        } catch (err) {
            console.error("Gagal melakukan absensi:", err);
            alert("Terjadi kesalahan saat mencatat absensi.");
            btnAbsen.disabled = false;
            btnAbsen.innerHTML = `<i class="fa-solid fa-camera me-1"></i> Absen Sekarang`;
        }
    }
}

// Handler Pembuka Modal Jurnal
function openModalJurnal() {
    const modalEl = document.getElementById('modalJurnalSiswa');
    if (modalEl) {
        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
    }
}

// Handler Simpan Jurnal
async function handleSimpanJurnal(event) {
    event.preventDefault();
    const btnSimpan = document.getElementById('btnSimpanJurnal');
    const kegiatan = document.getElementById('jurnalKegiatan').value;

    if (!kegiatan.trim()) {
        alert("Mohon isi deskripsi kegiatan jurnal!");
        return;
    }

    btnSimpan.disabled = true;
    btnSimpan.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Menyimpan...`;

    try {
        // Simulasi Simpan Jurnal
        setTimeout(() => {
            alert("Jurnal harian berhasil disimpan!");
            document.getElementById('formJurnalSiswa').reset();
            btnSimpan.disabled = false;
            btnSimpan.innerText = "Simpan Jurnal";

            // Tutup modal
            const modalEl = document.getElementById('modalJurnalSiswa');
            const bsModal = bootstrap.Modal.getInstance(modalEl);
            if (bsModal) bsModal.hide();
        }, 1000);
    } catch (err) {
        console.error("Gagal menyimpan jurnal:", err);
        alert("Terjadi kesalahan sistem saat menyimpan jurnal.");
        btnSimpan.disabled = false;
        btnSimpan.innerText = "Simpan Jurnal";
    }
}