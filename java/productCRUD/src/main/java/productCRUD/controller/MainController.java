package productCRUD.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.RedirectView;

import productCRUD.model.Product;
import productCRUD.service.ProductService;

@Controller
public class MainController {
	@Autowired
	private ProductService productservice;
	
	@RequestMapping( path="/addProduct")
	public String addProduct( Model m ) {
		m.addAttribute("title","addProduct");
		return "addProduct";
	}
	
	@RequestMapping( path="/handlerproduct", method= RequestMethod.POST)
	public RedirectView handleProduct(@ModelAttribute Product product
									  ,HttpServletRequest request) {
		
		System.out.println(product);
		this.productservice.addProductDataToTable(product);
		RedirectView view = new RedirectView();
		view.setUrl(request.getContextPath()+"/");
		return view;
	}
	
	@RequestMapping(path="/")
	public String index(Model m ) {
		List<Product> products = this.productservice.getProductlist();
		m.addAttribute("product",products);
//		String str = null;
//		System.out.println( str.length());
		return "index";
	}
	
	@RequestMapping(path="/delete/{id}")
	public RedirectView delete(@PathVariable("id") int id, HttpServletRequest request) {
		System.out.println("id = "+id);
		this.productservice.deleteProduct(id);
		RedirectView view = new RedirectView();
		view.setUrl(request.getContextPath()+"/");
		return view;
	}
	
	@RequestMapping( path="/update/{id}")
	public String updateProduct( @PathVariable("id") int id, Model m ) {
		Product obj = this.productservice.updateProduct(id);
		m.addAttribute("product",obj);
		return "updateForm";
	}
	
}
