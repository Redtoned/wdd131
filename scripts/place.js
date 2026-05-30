const windChillElement = document.querySelector("#windchill");

// Static weather values
const temperature = 86; // °F
const windSpeed = 7; // mph

function calculateWindChill(temp, speed) {
    return (
        35.74 +
        (0.6215 * temp) -
        (35.75 * Math.pow(speed, 0.16)) +
        (0.4275 * temp * Math.pow(speed, 0.16))
    ).toFixed(1);
}

// Imperial conditions:
// Temperature <= 50°F
// Wind Speed > 3 mph

if (temperature <= 50 && windSpeed > 3) {
    windChillElement.textContent =
        `${calculateWindChill(temperature, windSpeed)} °F`;
} else {
    windChillElement.textContent = "N/A";
}