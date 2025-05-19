// Di file custom.js
window.onload = function () {
  const apiSelect = document.createElement("select");
  apiSelect.innerHTML = `
      <option value="web">API Web</option>
      <option value="mobile">API Mobile</option>
    `;
  apiSelect.addEventListener("change", function (event) {
    const value = event.target.value;
    const apis = document.querySelectorAll(".swagger-ui .opblock");
    apis.forEach((api) => {
      if (value === "web" && api.innerText.includes("/api/web/")) {
        api.style.display = "block";
      } else if (value === "mobile" && api.innerText.includes("/api/mobile/")) {
        api.style.display = "block";
      } else {
        api.style.display = "none";
      }
    });
  });
  document.querySelector(".swagger-ui").prepend(apiSelect);
};
