apiGetProducts();

function apiGetProducts(searchValue) {
    return axios({
      url: "https://64a6ad14096b3f0fcc8042da.mockapi.io/capstoneJS",
      method: "GET",
      params: {
        name: searchValue,
      }
    });
  }
  
  function apiGetProductById(productId) {
    return axios({
      url: `https://64a6ad14096b3f0fcc8042da.mockapi.io/capstoneJS/${productId}`,
      method: "GET",
    });
  }
  // product = {name: "...", price: 1000, image: "...", type: "..."}
  function apiCreateProduct(product) {
    return axios({
      url: "https://64a6ad14096b3f0fcc8042da.mockapi.io/capstoneJS",
      method: "POST",
      data: product,
    });
  }
  
  function apiUpdateProduct(productId, newProduct) {
    return axios({
      url: `https://64a6ad14096b3f0fcc8042da.mockapi.io/capstoneJS/${productId}`,
      method: "PUT",
      data: newProduct,
    });
  }
  
  function apiDeleteProduct(productId) {
    return axios({
      url: `https://64a6ad14096b3f0fcc8042da.mockapi.io/capstoneJS/${productId}`,
      method: "DELETE",
    });
  }
  
  
  
  
  
  
  
  
  
  