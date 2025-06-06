interface Coctel {
  nombre: string;
  ingredientes: string[];
  descripcion: string;
}

export function renderCoctelForm(container: HTMLElement) {
  const form = document.createElement("form");
  form.className = "space-y-4 p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-6 border border-gray-200";

  const nombreInput = document.createElement("input");
  nombreInput.placeholder = "Nombre del coctel";
  nombreInput.className = "border border-yellow-400 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition mb-2";
  nombreInput.required = true;

  const ingredientesInput = document.createElement("input");
  ingredientesInput.placeholder = "Ingredientes (separados por coma)";
  ingredientesInput.className = "border border-yellow-400 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition mb-2";
  ingredientesInput.required = true;

  const descripcionInput = document.createElement("textarea");
  descripcionInput.placeholder = "Descripcion del coctel";
  descripcionInput.className = "border border-yellow-400 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition mb-2 min-h-[80px]";
  descripcionInput.required = true;

  const errorBox = document.createElement("div");
  errorBox.className = "text-red-600 text-sm mb-2 min-h-[1.5em]";

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Guardar coctel";
  submitBtn.className = "bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-4 py-2 rounded shadow transition-colors w-full mt-2";

  form.append(nombreInput, ingredientesInput, descripcionInput, errorBox, submitBtn);
  container.appendChild(form);

  let previsualSection = document.getElementById("previsual-section");
  if (!previsualSection) {
    previsualSection = document.createElement("section");
    previsualSection.id = "previsual-section";
    previsualSection.innerHTML = `<h2 style='text-align:center;margin-bottom:1rem;'>Previsual</h2><div id="previsual-container"></div>`;
    container.parentElement?.insertBefore(previsualSection, container.nextSibling);
  }
  const previsualContainer = previsualSection.querySelector("#previsual-container") as HTMLElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorBox.innerHTML = "";

    const nombre = nombreInput.value.trim();
    const ingredientes = ingredientesInput.value.split(",").map(i => i.trim());
    const descripcion = descripcionInput.value.trim();

    if (!nombre || !ingredientes.length || !descripcion) {
      errorBox.textContent = "Todos los campos son obligatorios.";
      return;
    }

    if (nombre.length < 3) {
      errorBox.textContent = "El nombre debe tener al menos 3 caracteres.";
      return;
    }

    const nuevoCoctel: Coctel = { nombre, ingredientes, descripcion };
    import("./preViewCoctel").then(mod => {
      mod.renderCoctelCard(previsualContainer, nuevoCoctel);
    });
    form.reset();
  });
}
