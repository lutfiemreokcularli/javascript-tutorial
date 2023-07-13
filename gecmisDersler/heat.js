let heat = prompt("sıcaklığı giriniz:");

let heatInt = parseInt(heat);
console.log(String(heatInt));

let celciusDegree = (5/9 * (heatInt - 32));

console.log(`girmiş olduğunuz ${heat} fahrenheit tipindeki sıcaklığın celcius değeri: ${celciusDegree}`);