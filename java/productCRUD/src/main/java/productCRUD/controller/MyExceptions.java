package productCRUD.controller;

import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class MyExceptions {

	
	@ExceptionHandler( value = NullPointerException.class )
	public String nullpointer(Model m ) {
		m.addAttribute("msg","null pointer exception");
		return "null";
	}
	@ResponseStatus( value = HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler( value = Exception.class )
	public String exception(Model m) {
		m.addAttribute("msg","exceptionn caused in internal server");
		return "null";
	}
}
