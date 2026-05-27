export const renderProduct = (products) => {
  const renderPd = document.getElementById("renderPd");
  products.forEach((product) => {
    renderPd.innerHTML += ` 
    <tr>
        <td class="px-6 py-4">
        <p class="font-semibold">${product.nombre}</p>
        <p class="text-gray-500 text-sm">${product.descripcion}</p>
        </td>
        <td class="px-6 py-4">${product.stock}</td>
        <td class="px-6 py-4">${product.precioUnidad}</td>
        <td class="px-6 py-4 text-center">
          <div class="flex justify-end gap-3">
            <button data-id="${product.id}" class="btn-editar w-10 h-10 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100" title="Editar">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <button data-id="${product.id}" class="btn-eliminar w-10 h-10 flex items-center justify-center text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100" title="Eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            </div>
        </td>
</tr>`;
  });
};
