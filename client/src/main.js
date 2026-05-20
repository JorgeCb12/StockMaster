import './styles/globals.css';
import { alertaExitosa, alertaConfirmacion, alertaError } from './utils/alerts';
import { obtenerProductos, crearProducto, actualizarProducto as srvActualizarProducto, eliminarProducto as srvEliminarProducto } from './services/productos.service.js';

const formulario = document.getElementById("product-form")
const nombreProducto = document.getElementById("nombre")
const precioUnidad = document.getElementById("precio")
const stock = document.getElementById("stock")
const descripcionProducto = document.getElementById("descripcion")
const formTitle = document.getElementById("form-title")
const submitBtn = formulario.querySelector("button[type='submit']")

let editandoId = null;
let productosGlobal = [];

formulario.addEventListener("submit", (event) => {
    event.preventDefault()

    const productoNuevo = {
        nombre: nombreProducto.value.trim(),
        precioUnidad: Number(precioUnidad.value),
        stock: Number(stock.value),
        descripcion: descripcionProducto.value.trim()
    }

    if (editandoId) {
        actualizarProducto(editandoId, productoNuevo)
    } else {
        agregarProducto(productoNuevo)
    }
})

formulario.addEventListener("reset", () => {
    editandoId = null;
    formTitle.textContent = "Detalles del Producto";
    submitBtn.textContent = "Guardar Producto";
})

async function traeDatos() {
    try {
        const productos = await obtenerProductos();
        productosGlobal = productos;
        pintarLosDatos(productos)
        actualizarEstadisticas(productos)
    } catch (error) {
        console.error("Error al traer datos:", error)
        alertaError("Hubo un error al cargar los productos");
    }
}

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

async function actualizarProducto(id, producto) {
    try {
        await srvActualizarProducto(id, producto);
        traeDatos()
        alertaExitosa("Producto actualizado exitosamente")
        formulario.reset()
    } catch (error) {
        console.error("Error al actualizar:", error)
        alertaError("Hubo un error al actualizar el producto");
    }
}

async function eliminarProducto(id) {
    try {
        await srvEliminarProducto(id);
        traeDatos()
        alertaExitosa("Producto eliminado")
    } catch (error) {
        console.error("Error al eliminar:", error)
        alertaError("Hubo un error al eliminar el producto");
    }
}

traeDatos()

function pintarLosDatos(productos) {
    const lugarDeImpresion = document.getElementById("inventory-list")
    lugarDeImpresion.innerHTML = ``

    for (const producto of productos) {
        lugarDeImpresion.innerHTML += `
        <tr class="hover:bg-slate-50/30 transition-colors group">
            <td class="px-8 py-6">
                <div class="flex flex-col">
                <span class="font-bold text-slate-900 capitalize">${producto.nombre}</span>
                <span class="text-xs text-slate-400 mt-1 line-clamp-1 max-w-[300px]">${producto.descripcion}</span>
                </div>
            </td>
            <td class="px-8 py-6 text-center">
                <span class="px-4 py-1.5 ${producto.stock < 5 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'} rounded-xl text-[10px] font-black uppercase tracking-tight border">${producto.stock} unidades</span>
            </td>
            <td class="px-8 py-6 text-center font-bold text-slate-900">COP ${producto.precioUnidad.toLocaleString()}</td>
            <td class="px-8 py-6 text-right">
                <div class="flex justify-end gap-3">
                <button data-id="${producto.id}" class="btn-editar w-10 h-10 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button data-id="${producto.id}" class="btn-eliminar w-10 h-10 flex items-center justify-center text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                </div>
            </td>
        </tr>
        `
    }
}

document.getElementById("inventory-list").addEventListener("click", async (e) => {
    if (e.target.closest(".btn-eliminar")) {
        const id = e.target.closest(".btn-eliminar").dataset.id;
        const confirmado = await alertaConfirmacion();
        if (confirmado) {
            eliminarProducto(id);
        }
    }

    if (e.target.closest(".btn-editar")) {
        const id = e.target.closest(".btn-editar").dataset.id;
        prepararEdicion(id);
    }
});

function prepararEdicion(id) {
    const producto = productosGlobal.find(p => String(p.id) === String(id));
    if (!producto) return;

    nombreProducto.value = producto.nombre;
    precioUnidad.value = producto.precioUnidad;
    stock.value = producto.stock;
    descripcionProducto.value = producto.descripcion;

    editandoId = id;
    formTitle.textContent = "Editar Producto";
    submitBtn.textContent = "Actualizar Producto";
}

function actualizarEstadisticas(productos) {
    const totalSKU = productos.length;
    const valorTotal = productos.reduce((acc, p) => acc + (p.precioUnidad * p.stock), 0);
    const stockCritico = productos.filter(p => p.stock < 5).length;

    document.getElementById("stat-total").textContent = totalSKU;
    document.getElementById("stat-value").textContent = `COP ${valorTotal.toLocaleString()}`;
    document.getElementById("stat-low").textContent = stockCritico;
}
