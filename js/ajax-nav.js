/**
 * NyamCenter Administrator - Native AJAX Navigation & Dynamic Router
 * 100% Native Pure Vanilla & jQuery (Bebas dari Dependensi Bootstrap)
 */

$(document).ready(function () {
  const $contentArea = $('#main-content');
  const $loader = $('#ajax-loader');
  const $sidebar = $('#adminSidebar');
  const $overlay = $('#sidebarOverlay');

  /**
   * Fungsi Memuat Halaman menggunakan jQuery AJAX
   * @param {string} pageUrl - Berkas HTML tujuan (misal: 'dashboard.html', 'stan.html')
   * @param {string} pageTitle - Judul yang ditampilkan di Topbar
   */
  function loadPage(pageUrl, pageTitle) {
    // 1. Tampilkan animasi loading spinner
    $loader.stop(true, true).fadeIn(100);
    $contentArea.css('opacity', '0.25');

    // 2. Eksekusi request AJAX
    $.ajax({
      url: pageUrl,
      type: 'GET',
      dataType: 'html',
      cache: false,
      success: function (responseHtml) {
        setTimeout(function () {
          $loader.fadeOut(100, function () {
            // Masukkan HTML ke dalam kontainer utama
            $contentArea.html(responseHtml).css('opacity', '1');

            // Perbarui judul topbar
            if (pageTitle) {
              $('#topbar-title').text(pageTitle);
            }

            // Inisialisasi fitur interaktif halaman masing-masing
            if (typeof initStanFeatures === 'function') {
              initStanFeatures();
            }
            if (typeof initPenggunaFeatures === 'function') {
              initPenggunaFeatures();
            }
            if (typeof initTransaksiFeatures === 'function') {
              initTransaksiFeatures();
            }
            if (typeof initLaporanFeatures === 'function') {
              initLaporanFeatures();
            }

            // Re-bind tautan AJAX internal jika ada
            $contentArea.find('.ajax-link').off('click').on('click', function (e) {
              e.preventDefault();
              const p = $(this).attr('data-page');
              const t = $(this).attr('data-title');
              $('.nav-item-link').removeClass('active');
              $(`.nav-item-link[data-page="${p}"]`).addClass('active');
              loadPage(p, t);
            });
          });
        }, 120);
      },
      error: function (xhr, status, error) {
        $loader.fadeOut(100);
        $contentArea.css('opacity', '1');
        $contentArea.html(`
          <div class="custom-alert alert-danger" style="margin: 20px 0;">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <div>
              <strong>Gagal Memuat Halaman!</strong><br>
              <small>Terjadi kendala saat mengambil berkas <code>${pageUrl}</code> (${status} - ${error}).</small>
            </div>
          </div>
        `);
      }
    });
  }

  // Event Listener Klik Menu Navigasi Sidebar
  $(document).on('click', '.nav-item-link.ajax-link', function (e) {
    e.preventDefault();

    const targetPage = $(this).attr('data-page');
    const targetTitle = $(this).attr('data-title');

    $('.nav-item-link').removeClass('active');
    $(this).addClass('active');

    loadPage(targetPage, targetTitle);

    // Di layar mobile, tutup sidebar
    $sidebar.removeClass('show-sidebar');
    $overlay.removeClass('active');
  });

  // Mobile Sidebar Toggle
  $('#btn-sidebar-toggle').on('click', function () {
    $sidebar.toggleClass('show-sidebar');
    $overlay.toggleClass('active');
  });

  // Klik di overlay untuk menutup sidebar mobile
  $overlay.on('click', function () {
    $sidebar.removeClass('show-sidebar');
    $overlay.removeClass('active');
  });

  // Theme Toggle (Light / Dark)
  $('#theme-toggle-btn').on('click', function () {
    const currentTheme = $('html').attr('data-theme') || $('html').attr('data-bs-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    $('html').attr('data-theme', nextTheme);
    $('html').attr('data-bs-theme', nextTheme);
    $('#theme-icon').toggleClass('fa-sun fa-moon');
  });

  // ================= MODAL HANDLER GLOBAL (NATIVE) =================
  // Klik di luar dialog modal untuk menutup
  $(document).on('click', '.custom-modal', function (e) {
    if ($(e.target).hasClass('custom-modal')) {
      $(this).removeClass('show');
      $('body').css('overflow', '');
    }
  });

  // Menutup modal dengan tombol ESC
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      $('.custom-modal.show').removeClass('show');
      $('body').css('overflow', '');
    }
  });

  // Default Pertama Kali: Muat Dashboard Utama
  loadPage('dashboard.html', 'Dashboard Utama Administrator');
});
