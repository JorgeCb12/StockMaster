import './styles/globals.css';
import { alertaExitosa, alertaConfirmacion, alertaError } from './utils/alerts';
import { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto } from './services/productos.service.js';
import { actualizarEstadisticas } from './ui/estadisticas.js';
import { pintarLosDatos } from './ui/renderProductos.js';









const formulario = document.getElementById("product-form")
const formTitle = document.getElementById("form-title")
const submitBtn = formulario.querySelector("button[type='submit']")
const nombreProducto = document.getElementById("nombre")
const precioUnidad = document.getElementById("precio")
const stock = document.getElementById("stock")
const descripcionProducto = document.getElementById("descripcion")
const tableBody = document.getElementById("inventory-list")

let editandoId = null;

formulario.addEventListener("submit", (event) => {
    event.preventDefault()

    const productoNuevo = {
        nombre: nombreProducto.value.trim(),
        precioUnidad: Number(precioUnidad.value),
        stock: Number(stock.value),
        descripcion: descripcionProducto.value.trim()
    }

    if (editandoId) {
        guardarCambiosProducto(editandoId, productoNuevo)
    } else {
        agregarProducto(productoNuevo)
    }
})

formulario.addEventListener("reset", () => {
    editandoId = null;
    formTitle.textContent = "Detalles del Producto";
    submitBtn.textContent = "Guardar Producto";
})

tableBody.addEventListener("click", async (e) => {
    
    if (e.target.closest(".btn-eliminar")) {
        const id = e.target.closest(".btn-eliminar").dataset.id;
        const confirmado = await alertaConfirmacion();
        if (confirmado) {
            borrarProducto(id);
        }
    }

    if (e.target.closest(".btn-editar")) {
        const id = e.target.closest(".btn-editar").dataset.id;
        await prepararEdicion(id);
    }
});

// GET
async function traeDatos() {
    try {
        const productos = await obtenerProductos();
        pintarLosDatos(productos)
        actualizarEstadisticas(productos)
    } catch (error) {
        console.error("Error al traer datos:", error)
        alertaError("Hubo un error al cargar los productos");
    }
}

// POST
async function agregarProducto(producto) {
    try {
        await crearProducto(producto);
        traeDatos()
        alertaExitosa("Producto agregado exitosamente")
        formulario.reset()
    } catch (error) {
        console.error("Error al agregar:", error)
        alertaError("Hubo un error al guardar el producto");
    }
}

// PUT
async function guardarCambiosProducto(id, producto) {
    try {
        await actualizarProducto(id, producto);
        traeDatos()
        alertaExitosa("Producto actualizado exitosamente")
        formulario.reset()
    } catch (error) {
        console.error("Error al actualizar:", error)
        alertaError("Hubo un error al actualizar el producto");
    }
}

// DELETE
async function borrarProducto(id) {
    try {
        await eliminarProducto(id);
        traeDatos()
        alertaExitosa("Producto eliminado")
    } catch (error) {
        console.error("Error al eliminar:", error)
        alertaError("Hubo un error al eliminar el producto");
    }
}

// EDIT
async function prepararEdicion(id) {
    try {
        const producto = await obtenerProductoPorId(id);

        nombreProducto.value = producto.nombre;
        precioUnidad.value = producto.precioUnidad;
        stock.value = producto.stock;
        descripcionProducto.value = producto.descripcion;

        editandoId = id;
        formTitle.textContent = "Editar Producto";
        submitBtn.textContent = "Actualizar Producto";
    } catch (error) {
        console.error("Error al preparar edición:", error)
        alertaError("Hubo un error al cargar el producto");
    }
}

traeDatos()
