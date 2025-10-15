// Simple client-side behavior to mirror a basic, static prototype

const form = document.getElementById('rideForm');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const data = new FormData(form);
	const pickup = data.get('pickup')?.trim();
	const dropoff = data.get('dropoff')?.trim();
	const vehicle = data.get('vehicle');

	// Minimal validation feedback
	if (!pickup || !dropoff) {
		alert('Please enter both Pickup and Dropoff locations.');
		return;
	}

	// Simulate a request
	console.log('Requesting ride:', { pickup, dropoff, vehicle });
	alert(`Ride requested!\n\nPickup: ${pickup}\nDropoff: ${dropoff}\nVehicle: ${vehicle}`);
});

// Optional: highlight the select on change to mimic focus color
document.getElementById('vehicle').addEventListener('change', (e) => {
	e.target.style.borderColor = 'var(--green)';
});