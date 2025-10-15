

if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function(callback, type, quality) {
            const canvas = this;
            setTimeout(() => {
                const dataURL = canvas.toDataURL(type, quality).split(',')[1];
                const binStr = atob(dataURL);
                const len = binStr.length;
                const arr = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }
                callback(new Blob([arr], { type: type || 'image/png' }));
            });
        }
    });
}
const video = document.getElementById('video');
const scanButton = document.getElementById('scanButton');
const result = document.getElementById('result');

// Open webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => alert("Cannot access camera: " + err));

// Scan button click
scanButton.addEventListener('click', () => {
  // Capture current video frame
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  result.innerText = "Scanning...";

  // OCR with Tesseract.js
  Tesseract.recognize(canvas, 'eng', { logger: m => console.log(m) })
    .then(({ data: { text } }) => {
      const plate = text.trim().replace(/\s/g, '').toUpperCase(); // clean text
      result.innerText = "Detected Plate: " + plate;

      // Send plate to backend for verification
      fetch('http://localhost:3000/verify-plate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plate })
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        console.log(data);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to verify number plate.");
      });

    })
    .catch(err => {
      console.error(err);
      result.innerText = "Error scanning number plate.";
    });
});
function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;  // remove video from element
    }
}

// Ride form submission
document.getElementById('rideForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const pickup = document.getElementById('pickup').value;
      const dropoff = document.getElementById('dropoff').value;
      const means = document.getElementById('means').value;

      try {
        const res = await fetch('http://localhost:3000/rides', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pickup, dropoff, means })
        });

        const data = await res.json();
        document.getElementById('response').innerText = data.message;
      } catch (err) {
        document.getElementById('response').innerText = 'Error submitting ride';
      }
    });