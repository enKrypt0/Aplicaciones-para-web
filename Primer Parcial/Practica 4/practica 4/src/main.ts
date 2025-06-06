import "./style.css";
import { renderCoctelForm } from "../modulos/cocteleraVirtual";
import { renderRecomendaciones } from "../modulos/recomendaciones";

const formContainer = document.getElementById("form-container")!;
const recomendacionesContainer = document.getElementById("recomendaciones-container")!;

renderCoctelForm(formContainer);
renderRecomendaciones(recomendacionesContainer);
