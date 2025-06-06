import type { Coctel } from "./interfaces";

export function renderCoctelCard(container: HTMLElement, coctel: Coctel) {
  const card = document.createElement("div");
  card.className = "cocktail-card";

  const nombre = document.createElement("h3");
  nombre.textContent = coctel.nombre;
  nombre.className = "text-xl font-bold mb-2";

  const ingredientes = document.createElement("ul");
  ingredientes.className = "list-disc ml-4 mb-2";
  coctel.ingredientes.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    ingredientes.appendChild(li);
  });

  const descripcion = document.createElement("p");
  descripcion.textContent = coctel.descripcion;
  descripcion.className = "";

  card.append(nombre, ingredientes, descripcion);
  container.appendChild(card);
}
