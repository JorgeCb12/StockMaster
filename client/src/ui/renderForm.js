import { createProduct, updateProduct } from "../services/productos.service";

let editingProductId = null;

export const renderForm = () => {
  const containerForm = document.getElementById("containerForm");
  containerForm.innerHTML = `
    <form id="product-form" class="p-8 space-y-6">
                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">Nombre del Producto</label>
                    <input type="text" id="inputName" name="nombre" required placeholder="Ej. Monitor LG 27&quot;" class="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-slate-50/30">
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-bold text-slate-700 mb-2">Precio ($)</label>
                      <input type="number" step="0.01" id="inputPrice" name="precio" required placeholder="0.00" class="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-slate-50/30">
                    </div>
                    <div>
                      <label class="block text-sm font-bold text-slate-700 mb-2">Stock Actual</label>
                      <input type="number" id="inputStock" name="stock" required placeholder="0" class="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-slate-50/30">
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">Descripción</label>
                    <textarea id="inputDescription" name="descripcion" rows="4" placeholder="Especificaciones, colores, estado..." class="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none bg-slate-50/30"></textarea>
                  </div>

                  <div class="pt-2 flex flex-col gap-3">
                    <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] uppercase tracking-wider text-sm">
                      Guardar Producto
                    </button>
                    <button type="reset" class="w-full px-4 py-3 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all text-xs uppercase tracking-widest">
                      Limpiar Formulario
                    </button>
                  </div>
                </form>
    `;
};

export const setupForm = (loadProducts) => {
  const form = document.getElementById("product-form");
  const inputName = document.getElementById("inputName");
  const inputPrice = document.getElementById("inputPrice");
  const inputStock = document.getElementById("inputStock");
  const inputDescription = document.getElementById("inputDescription");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = inputName.value;
    const price = Number(inputPrice.value);
    const stock = Number(inputStock.value);
    const descripcion = inputDescription.value;

    const newProduct = {
      nombre: name,
      precioUnidad: price,
      stock: stock,
      descripcion: descripcion,
    };

    try {
      if (editingProductId === null) {
        await createProduct(newProduct);
        form.reset();
        await loadProducts();
      } else {
        await updateProduct(editingProductId, newProduct);
        form.reset();
        await loadProducts();
        editingProductId = null;
      }
    } catch (error) {
      console.error(`Error al crear el producto: ${error.message}`);
    }
  });
};

export const fillForm = (product) => {
  editingProductId = product.id;

  const inputName = document.getElementById("inputName");
  const inputPrice = document.getElementById("inputPrice");
  const inputStock = document.getElementById("inputStock");
  const inputDescription = document.getElementById("inputDescription");

  inputName.value = product.nombre;
  inputPrice.value = product.precioUnidad;
  inputStock.value = product.stock;
  inputDescription.value = product.descripcion;
};
