package productCRUD.Dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Component;

import productCRUD.model.Product;

@Component
public class ProductDao {
	
	@Autowired
	private HibernateTemplate hibernateTemplate;
	
	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}
	@Autowired
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	@Transactional
	public void createProduct( Product product) {
		this.hibernateTemplate.saveOrUpdate(product);
	}
	
	// get all product 
	public List<Product> getProducts(){
		List<Product> list = this.hibernateTemplate.loadAll(Product.class);
		return list;
	}
	
	// delete single product
	@Transactional
	public void deleteProduct(int pid ) {
		Product p = this.hibernateTemplate.load(Product.class, pid);
		this.hibernateTemplate.delete(p);
	}
	
	// get single product 
	public Product getProduct( int pid ) {
		return this.hibernateTemplate.get(Product.class, pid );
	}

}
