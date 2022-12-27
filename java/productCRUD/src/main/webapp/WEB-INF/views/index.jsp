<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="./base.jsp" %>
<style>
body {
		background-color: #000000;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='10' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E");
		color:white;
}
h1{
	color:white;
}


</style>
</head>
<body>
	
	<div class="container mt-3 ">
		<div class="row">
			<div class="col-md-12">
				<h1 class="text-center mb-3">Welcome to the Store!!!</h1>
				<table class="table table-dark shadow-sm table-hover mt-4">
					<thead class="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Product Name</th>
							<th scope="col">Product Description</th>
							<th scope="col">Price</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${product}" var="p">
							<tr>
								<th scope="row">TEXHNO${p.id}</th>
								<td>${p.name }</td>
								<td>${p.description}</td>
								<td class="font-weight-bold">&#8377; ${p.price}</td>
								<td class="text-center">
								<a href="delete/${p.id}">
									 <i class="fa-solid fa-trash-can text-danger"></i>
								</a>
								<a href="update/${p.id}">
									<i class="fa-solid fa-pen"></i>
								</a>
								</td>
							</tr>						
						</c:forEach>
					</tbody>
				</table>
				<div class="container text-center">
					<a href="addProduct" class="btn btn-primary">Add Product</a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>