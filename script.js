document.addEventListener('DOMContentLoaded', function() {
    addBox(); // Add the first box row on load
});

function addBox() {
    const parcelsDiv = document.getElementById('parcels');
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="number" min="1" placeholder="Qty" class="parcel-quantity">
        <input type="number" min="1" placeholder="L (cm)" class="parcel-dimension">
        <input type="number" min="1" placeholder="W (cm)" class="parcel-dimension">
        <input type="number" min="1" placeholder="H (cm)" class="parcel-dimension">
        <button class="remove-box" onclick="removeBox(this)">Remove</button>
    `;
    parcelsDiv.appendChild(div);
}

function removeBox(button) {
    button.parentElement.remove();
    calculateWeight(); // Recalculate after removing a box
}

function calculateWeight() {
    const parcels = document.querySelectorAll('#parcels div');
    let totalVolumetricWeight = 0;
    parcels.forEach(parcel => {
        const qty = parcel.querySelector('.parcel-quantity').value || 0;
        const length = parcel.querySelector('.parcel-dimension:nth-child(2)').value || 0;
        const width = parcel.querySelector('.parcel-dimension:nth-child(3)').value || 0;
        const height = parcel.querySelector('.parcel-dimension:nth-child(4)').value || 0;
        const volume = length * width * height;
        const weight = (volume / 6000) * qty;
        totalVolumetricWeight += weight;
    });
    document.getElementById('totalWeight').textContent = `Total Volumetric Weight: ${totalVolumetricWeight.toFixed(2)} kg`;
}
