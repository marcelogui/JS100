btnChangeColor = document.getElementById("btn-bg-color");

btnChangeColor.addEventListener("click", function () {
  const { red, green, blue } = colorPicker();
  const container = document.querySelector(".container");
  container.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
});


function colorPicker() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  const color = {
    red,
    green,
    blue,
  };

  return color;
}
