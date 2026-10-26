/**
 * NyamCenter Administrator - Client-side Form Validation Engine
 */

function initAdminFormValidation() {
  const $form = $('#formTambahUser');
  if ($form.length === 0) return;

  // Regex Helper
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,11}$/;

  // Fungsi Helper Validasi Tiap Field
  function validateField($input, isValid, errorMsg) {
    const $feedback = $input.siblings('.invalid-feedback-custom');
    if (isValid) {
      $input.removeClass('is-invalid').addClass('is-valid');
      $feedback.hide().text('');
      return true;
    } else {
      $input.removeClass('is-valid').addClass('is-invalid');
      $feedback.show().text(errorMsg);
      return false;
    }
  }

  // 1. Validasi Nama Lengkap
  $('#nama').on('input blur', function () {
    const val = $(this).val().trim();
    if (val.length < 3) {
      validateField($(this), false, 'Nama lengkap wajib diisi minimal 3 karakter.');
    } else {
      validateField($(this), true);
    }
  });

  // 2. Validasi Email
  $('#email').on('input blur', function () {
    const val = $(this).val().trim();
    if (!emailRegex.test(val)) {
      validateField($(this), false, 'Format email tidak valid (contoh: user@nyamcenter.id).');
    } else {
      validateField($(this), true);
    }
  });

  // 3. Validasi Password
  $('#password').on('input blur', function () {
    const val = $(this).val();
    if (val.length < 6) {
      validateField($(this), false, 'Password wajib minimal 6 karakter.');
    } else {
      validateField($(this), true);
    }
    // Jika konfirmasi password sudah terisi, validasi ulang kecocokannya
    if ($('#password_confirm').val().length > 0) {
      $('#password_confirm').trigger('input');
    }
  });

  // 4. Validasi Konfirmasi Password
  $('#password_confirm').on('input blur', function () {
    const val = $(this).val();
    const passVal = $('#password').val();
    if (val !== passVal || val.length === 0) {
      validateField($(this), false, 'Konfirmasi password tidak cocok dengan password di atas.');
    } else {
      validateField($(this), true);
    }
  });

  // 5. Validasi Nomor Telepon (Format Indonesia)
  $('#no_telepon').on('input blur', function () {
    const val = $(this).val().trim();
    if (!phoneRegex.test(val)) {
      validateField($(this), false, 'Nomor HP tidak valid. Gunakan format Indonesia (misal: 081234567890).');
    } else {
      validateField($(this), true);
    }
  });

  // 6. Validasi Role
  $('#role').on('change blur', function () {
    const val = $(this).val();
    if (!val) {
      validateField($(this), false, 'Silakan pilih peran pengguna.');
    } else {
      validateField($(this), true);
    }
  });

  // 7. Validasi Nominal Saldo Awal / Limit
  $('#saldo_awal').on('input blur', function () {
    const val = parseInt($(this).val(), 10);
    if (isNaN(val) || val < 0) {
      validateField($(this), false, 'Nominal limit saldo harus berupa angka dan minimal Rp 0.');
    } else {
      validateField($(this), true);
    }
  });

  // 8. Event Submit Form Utama
  $form.on('submit', function (e) {
    // MENCEGAH SUBMIT DEFAULT KE HTTP SEBELUM VALIDASI LENGKAP
    e.preventDefault();

    // Trigger semua input event untuk cek serentak
    $('#nama').trigger('blur');
    $('#email').trigger('blur');
    $('#password').trigger('blur');
    $('#password_confirm').trigger('blur');
    $('#no_telepon').trigger('blur');
    $('#role').trigger('blur');
    $('#saldo_awal').trigger('blur');

    // Cek Checkbox Persetujuan
    const $syarat = $('#persetujuan_admin');
    const isSyaratChecked = $syarat.is(':checked');
    if (!isSyaratChecked) {
      $syarat.addClass('is-invalid');
      $('#syarat-feedback').show().text('Anda harus menyetujui pakta integritas administrator.');
    } else {
      $syarat.removeClass('is-invalid');
      $('#syarat-feedback').hide();
    }

    // Periksa apakah ada input dengan class 'is-invalid'
    const totalErrors = $form.find('.is-invalid').length;

    if (totalErrors > 0) {
      // Tampilkan Alert Error
      $('#form-alert-container').html(`
        <div class="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 mb-3" role="alert">
          <i class="fa-solid fa-circle-exclamation fs-5"></i>
          <div>
            <strong>Validasi Gagal!</strong> Ditemukan <strong>${totalErrors} field</strong> yang belum diisi dengan benar. Silakan periksa tanda merah.
          </div>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="alert"></button>
        </div>
      `);

      // Fokus ke elemen error pertama
      $form.find('.is-invalid').first().focus();
      return false;
    }

    // JIKA SELURUH VALIDASI LOLOS (BERHASIL)
    const formData = {
      nama: $('#nama').val().trim(),
      email: $('#email').val().trim(),
      role: $('#role').val(),
      telepon: $('#no_telepon').val().trim(),
      limit: parseInt($('#saldo_awal').val(), 10).toLocaleString('id-ID')
    };

    // Tampilkan Notifikasi Sukses Simulasi Submit
    $('#form-alert-container').html(`
      <div class="alert alert-success alert-dismissible fade show p-3 mb-3 shadow-sm" role="alert">
        <h6 class="fw-bold mb-1"><i class="fa-solid fa-circle-check text-success me-2"></i> Pendaftaran Pengguna Berhasil!</h6>
        <p class="small mb-2">Akun pengguna baru telah berhasil divalidasi dan tersimpan di database.</p>
        <div class="bg-body-secondary p-2 rounded-3 small">
          <strong>Ringkasan Akun:</strong><br>
          • Nama: <code>${formData.nama}</code><br>
          • Email: <code>${formData.email}</code><br>
          • Hak Akses: <code>${formData.role}</code><br>
          • No Telepon: <code>${formData.telepon}</code><br>
          • Plafon Saldo: <code>Rp ${formData.limit}</code>
        </div>
        <button type="button" class="btn-close shadow-none" data-bs-dismiss="alert"></button>
      </div>
    `);

    // Reset Form setelah simulasi berhasil
    $form[0].reset();
    $form.find('.is-valid').removeClass('is-valid');

    // Scroll ke atas alert
    $('html, body, .admin-main').animate({ scrollTop: 0 }, 300);
  });
}
