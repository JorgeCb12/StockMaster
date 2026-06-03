export const renderStatistics = (products) => {
  const containerStatistics = document.getElementById('containerStatistics')
  let sumaTotal = 0
  let stockCritico = 0
  products.forEach((product) => {
    sumaTotal += product.precioUnidad

    if (product.stock <= 2) {
      stockCritico++
    }
    containerStatistics.innerHTML = `
       <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="bg-white p-6 rounded-xl border">
              <p class="text-xs text-gray-500">Total SKU</p>
              <p class="text-3xl font-bold">${products.length}</p>
            </div>

            <div class="bg-white p-6 rounded-xl border">
              <p class="text-xs text-gray-500">Valor Inventario</p>
              <p class="text-2xl font-bold text-blue-600">$ ${sumaTotal}</p>
            </div>

            <div class="bg-white p-6 rounded-xl border border-red-200">
              <p class="text-xs text-gray-500">Stock Crítico</p>
              <p class="text-3xl font-bold text-red-600">${stockCritico}</p>
            </div>
          </div>
  `
  })
}
