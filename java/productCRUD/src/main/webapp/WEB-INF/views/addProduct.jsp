<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<%@include file="./base.jsp" %>
</head>
<body>
	<div class="container mt-3">
		<div class="row">
			<div class="col-md-6 offset-md-3">
				<h1 class="text-center mb-3">Fill Product detail plz</h1>
				<form class="card shadow-lg border border-4 rounded-3 p-4" action="handlerproduct" method="post">
					<div class="form-group">
						<label class="form-label" for="name">Product name</label>
						<input type="text" class="form-control" id="name" name="name"
							   placeholder="Enter the product name">
					</div>
					<div class="form-group">
						<label class="form-label" for="description">Product description</label>
						<textarea id="description" 
						   		  class="form-control" 
						   		  name="description"
						   		  rows="5"
							   	  placeholder="Enter the product description"></textarea>
					</div>
					<div class="form-group">
						<label class="form-label" for="price">Product Price</label>
						<input type="text" class="form-control" id="price" name="price"
							   placeholder="Enter the product price">
					</div>
					<div class="container text-center">
						<a href="${pageContext.request.contextPath}/"
						   class="btn btn-outline-danger">Back</a>
						<button type="submit" class="btn btn-primary">Add</button>
					</div>
				</form>			
			</div>
		</div>
	</div>
</body>
</html>