<script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>
const driverInfoDiv = document.getElementById("driverInfo");

function fetchDriver(numberPlate) {
  fetch(`http://localhost:3000/drivers/vehicles/${numberPlate}`)
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        driverInfoDiv.innerHTML = `<p style="color:red">${data.message}</p>`;
      } else {
        driverInfoDiv.innerHTML = `
          <h3>Driver Info</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phoneNumber}</p>
          <p><strong>Vehicle:</strong> ${data.vehicle}</p>
          <p><strong>Number Plate:</strong> ${data.numberPlate}</p>
        `;
      }
    })
    .catch(err => {
      console.error(err);
      driverInfoDiv.innerHTML = "<p style='color:red'>Error fetching driver info</p>";
    });
}

// Initialize QR code scanner
function startScanner() {
  const html5QrCode = new Html5Qrcode("preview");

  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: 250
    },
    qrCodeMessage => {
      console.log(`QR Code detected: ${qrCodeMessage}`);
      fetchDriver(qrCodeMessage); // Fetch driver info using scanned number plate
      html5QrCode.stop(); // Stop scanning after first read
    },
    errorMessage => {
      console.warn(`QR Code scan error: ${errorMessage}`);
    }
  ).catch(err => console.error(err));
}

startScanner();

