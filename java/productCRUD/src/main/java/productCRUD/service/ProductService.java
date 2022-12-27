package productCRUD.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import productCRUD.Dao.ProductDao;
import productCRUD.model.Product;

@Service
public class ProductService {
	
	@Autowired
	private ProductDao productdao;
	
	public void addProductDataToTable(Product product) {
		this.productdao.createProduct(product);
	}
	
	public List<Product> getProductlist(){
		return this.productdao.getProducts();
	}
	
	public void deleteProduct(int id) {
		this.productdao.deleteProduct(id);
	}
	
	public Product updateProduct(int id) {
		return this.productdao.getProduct(id);
	}
}
