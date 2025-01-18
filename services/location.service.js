const axios = require('axios');

exports.getAddressFromCoordinates = async (lat, lng)=> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

    try {
        const response = await axios.get(url);
        const address = response.data.display_name; // Full address

        if (address) {
            console.log(`Address: ${address}`);
            return address;
        } else {
            console.log("No address found for these coordinates.");
        }
    } catch (error) {
        console.error("Error fetching address:", error.message);
    }
}
exports.generateGoogleMapsLink = (lat, lng) => {
    if(!lat || !lng) {
        throw new Error("Latitude and longitude are required.");
    }
    const baseUrl = "https://www.google.com/maps?q=";
    return `${baseUrl}${lat},${lng}`;
}