import type { Coctel } from "./interfaces";
import { renderCoctelCard } from "./preViewCoctel";

const recomendaciones: Coctel[] = [
  { nombre: "Mojito", ingredientes: ["Ron", "Hierbabuena", "Azucar", "Lima"], descripcion: "Fresco y delicioso." },
  { nombre: "Piña Colada", ingredientes: ["Ron", "Piña", "Coco"], descripcion: "Dulce y tropical." },
  { nombre: "Bloody Mary", ingredientes: ["Vodka", "Tomate", "Limon"], descripcion: "Picante y diferente." },
];

export function renderRecomendaciones(container: HTMLElement) {
  container.innerHTML = "";
  container.className = "grid grid-cols-1 md:grid-cols-2 gap-6";
  recomendaciones.forEach((coctel, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "relative";

    renderCoctelCard(wrapper, coctel);
    const card = wrapper.querySelector('.cocktail-card') as HTMLElement | null;
    if (card) {
      card.style.position = "relative";
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Eliminar";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => {
        recomendaciones.splice(index, 1);
        renderRecomendaciones(container);
      };
      card.appendChild(deleteBtn);
    }
    container.appendChild(wrapper);
  });
}
