// Inisialisasi peta
var map = L.map('map').setView([-2.5, 118], 5); // Koordinat pusat Indonesia

// Tambahkan tile layer OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Array flora fauna dan data provinsi asalnya dengan koordinat
var animals = [
    {
        name: 'Komodo',
        image: 'assets/komodo-ntt.jpg',
        province: 'Nusa Tenggara Timur',
        coords: [-8.656290, 121.079370] // Koordinat perkiraan NTT
    },
    {
        name: 'Orangutan',
        image: 'assets/orangutan-kalimantan.jpg',
        province: 'Kalimantan',
        coords: [0.7893, 113.9213] // Koordinat perkiraan Kalimantan
    },
    {
        name: 'Harimau',
        image: 'assets/harimau-sumatra.jpg',
        province: 'Sumatra',
        coords: [-0.7893, 101.2655] // Koordinat perkiraan Sumatra
    },
    {
        name: 'tapir',
        image: 'assets/tapir-sumatera.jpg',
        province: 'Sumatra',
        coords: [-0.7893, 101.2655] // Koordinat perkiraan Sumatera
    },
    {
        name: 'kukang',
        image: 'assets/kukang-jawa.jpg',
        province: 'Jawa',
        coords: [-6.2088, 106.8456] // Koordinat perkiraan Jawa
    },
    {
        name: 'badak bercula 1',
        image: 'assets/badak bercula 1-sumatera.jpg',
        province: 'Sumatera',
        coords: [-0.7893, 101.2655] // Koordinat perkiraan Sumatera
    },
    {
        name: 'Burung Jarak Bali',
        image: 'assets/jarak bali-bali.jpg',
        province: 'Bali',
        coords: [-8.0573, 114.8387] // Koordinat perkiraan Bali
    },
    {
        name: 'Burung Cendrawasih',
        image: 'assets/burung cendrawasih-papua.jpg',
        province: 'Papua',
        coords: [-4.5170, 140.5270] // Koordinat perkiraan Papua
    },
    {
        name: 'Burung Maleo',
        image: 'assets/burung maleo-sulawesi.jpg',
        province: 'Sulawesi',
        coords: [-1.5000, 120.0000] // Koordinat perkiraan Sulawesi
    },
    {
        name: 'Bunga Raflesia Arnoldi',
        image: 'assets/rafflesia arnoldi-bengkulu.jpg',
        province: 'Bengkulu',
        coords: [-0.8000, 102.8500] // Koordinat perkiraan Bengkulu
    },
    {
        name: 'Bunga Edelwaise',
        image: 'assets/edelwaise-jawa timur.jpg',
        province: 'Jawa',
        coords: [-7.9422, 112.9536] // Koordinat perkiraan Jawa
    },
    {
        name: 'Bunga Anggrek Hitam',
        image: 'assets/anggrek hitam-kalimantan.jpg',
        province: 'Kalimantan',
        coords: [0.7893, 113.9213] // Koordinat perkiraan Kalimantan
    },
    {
        name: 'Bunga Bangkai',
        image: 'assets/bunga bangkai-sumatera.jpg',
        province: 'Sumatera',
        coords: [-0.7893, 101.2655] // Koordinat perkiraan Sumatra
    },
    {
        name: 'Babi Rusa',
        image: 'assets/babi rusa-sulawesi.jpg',
        province: 'Sulawesi',
        coords: [-1.4304, 120.0133] // Koordinat perkiraan Sulawesi
    },
    {
        name: 'Burung Kasuari',
        image: 'assets/burung kasuari-papua.jpg',
        province: 'Papua',
        coords: [-4.2699, 138.0804] // Koordinat perkiraan Papua
    },
    {
        name: 'Cengkeh',
        image: 'assets/cengkeh-maluku.jpg',
        province: 'Maluku',
        coords: [-3.6000, 128.2000] // Koordinat perkiraan Maluku
    },
    {
        name: 'Labi-labi',
        image: 'assets/labi labi-kalimantan.jpg',
        province: 'Kalimantan',
        coords: [0.5897, 114.5333] // Koordinat perkiraan Kalimantan
    },
    {
        name: 'Pesut Mahakam',
        image: 'assets/pesut mahakam-kalimantan.jpg',
        province: 'Kalimantan',
        coords: [-0.7380, 117.5274] // Koordinat perkiraan Kalimantan
    },
    {
        name: 'Siamang',
        image: 'assets/siamang-sumatra.jpg',
        province: 'Sumatera',
        coords: [-2.0000, 101.5000] // Koordinat perkiraan Sumatra
    },
    {
        name: 'Eucallyptus',
        image: 'assets/eucallyptus-jawa.jpg',
        province: 'Jawa',
        coords: [-7.6145, 110.7122] // Koordinat perkiraan Jawa
    },
    // Tambahkan lebih banyak flora fauna dan provinsi asal di sini...
];

var score = 0;
var timeLeft = 120;
var timer;
var currentAnimal;
var line; // Untuk menyimpan referensi ke garis yang ditarik
var isDragging = false;
var startLatLng;

// Update UI untuk skor dan waktu
function updateUI() {
    document.getElementById('points').textContent = score;
    document.getElementById('time').textContent = timeLeft;
}

// Mulai timer
function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        updateUI();

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Waktu habis! Skor Anda: ' + score);
            resetGame();
        }
    }, 1000);
}

// Reset permainan
function resetGame() {
    score = 0;
    timeLeft = 120;
    updateUI();
    startTimer();
    nextAnimal();
}

// Pilih flora fauna berikutnya
function nextAnimal() {
    if (line) {
        map.removeLayer(line); // Hapus garis sebelumnya jika ada
    }
    currentAnimal = animals[Math.floor(Math.random() * animals.length)];
    document.getElementById('animal-image').src = currentAnimal.image;
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, isSuccess) {
    var notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = isSuccess ? 'green' : 'red';
    notification.classList.remove('hidden');
    notification.classList.add('visible');

    // Sembunyikan notifikasi setelah 2 detik
    setTimeout(function() {
        notification.classList.remove('visible');
        notification.classList.add('hidden');
    }, 2000);
}

// Mulai permainan
updateUI();
startTimer();
nextAnimal();

// Event listener untuk drag-and-drop
document.getElementById('animal-image').addEventListener('mousedown', function(e) {
    isDragging = true;
    startLatLng = map.mouseEventToLatLng(e);
});

map.on('mousemove', function(e) {
    if (isDragging) {
        var endLatLng = e.latlng;

        if (line) {
            map.removeLayer(line); // Hapus garis sebelumnya jika ada
        }

        line = L.polyline([startLatLng, endLatLng], { color: 'blue', weight: 2 }).addTo(map);
    }
});

document.addEventListener('mouseup', function(e) {
    if (isDragging) {
        isDragging = false;

        var endLatLng = map.mouseEventToLatLng(e);

        // Cek apakah provinsi dari klik pengguna cocok dengan provinsi flora fauna
        var distance = map.distance(endLatLng, currentAnimal.coords);
        if (distance < 500000) { // 500 km adalah ambang batas yang dipilih secara arbitrer
            showNotification('Benar! flora atau fauna ini berasal dari ' + currentAnimal.province, true);
            score++;
        } else {
            showNotification('Salah, coba lagi!', false);
        }

        timeLeft = 120; // Reset waktu setiap kali menjawab
        updateUI();
        nextAnimal();
    }
});
