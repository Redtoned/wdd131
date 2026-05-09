const now = Temporal.Now.plainDateISO();
const currentYear = now.year;

console.log(`The current year is: ${currentYear}`);

document.getElementById("currentyear").innerHTML = currentYear;
document.getElementById("lastModified").innerHTML = document.lastModified;