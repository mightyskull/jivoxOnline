package com.jivox.services;

import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.apache.ibatis.exceptions.PersistenceException;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jivox.mybatisdao.JivoxOnlineDAO;
import com.jivox.pojo.Product;

@Path("/ProductService")
public class ProductService {
	
	private static JivoxOnlineDAO dao;
	private Logger log = LogManager.getLogger(ProductService.class);
	
	public ProductService() throws IOException
	{
		String resource = "mybatisConfig.xml";
		Reader reader = Resources.getResourceAsReader(resource);
		SqlSessionFactory sf = new SqlSessionFactoryBuilder().build(reader, "jivoxonline");
		dao = new JivoxOnlineDAO(sf);
	}

	@GET
	@Path("/getCategories")
	@Produces(MediaType.APPLICATION_JSON)
	public String getCategories(){
	     return ( dao.getCategories() == null ) ? "" : dao.getCategories().toString();
	}
	
	@GET
	@Path("/getCategoriesFull")
	@Produces(MediaType.APPLICATION_JSON)
	public String getCategoriesFull(){
	     return ( dao.getCategoriesFull() == null ) ? "" : dao.getCategoriesFull().toString();
	}
	
   @GET
   @Path("/getProducts")
   @Produces(MediaType.APPLICATION_JSON)
   public ArrayList<Product> getProducts(@QueryParam("cat") int category ){
      return dao.getProducts(category);
   }	
   
   @GET
   @Path("/getProductsAll")
   @Produces(MediaType.APPLICATION_JSON)
   public ArrayList<Product> getProductsAll(){
      return dao.getProductsAll();
   }
   
   @GET
   @Path("/getProductNames")
   @Produces(MediaType.APPLICATION_JSON)
   public String getProductNames(){
      try {
		return new ObjectMapper().writeValueAsString(dao.getProductNames());
	} catch (PersistenceException e) {
		e.printStackTrace();
	} catch (JsonProcessingException e) {
		e.printStackTrace();
	}
	return null;
   }
   
   @GET
   @Path("/getProductDesc")
   @Produces(MediaType.APPLICATION_JSON)
   public String getProductsDesc(){
	   try {
			return new ObjectMapper().writeValueAsString(dao.getProductDesc());
		} catch (PersistenceException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
   }
   
   @GET
   @Path("/productSearch")
   @Produces(MediaType.APPLICATION_JSON)
   public String searchKeywords(@QueryParam("key") String searchKeys){
	   return ( dao.searchProducts(searchKeys) == null ) ? "" : dao.searchProducts(searchKeys).toString();
   }
   
   @POST
   @Path("/insertProduct")
   @Produces(MediaType.TEXT_PLAIN)
   @Consumes(MediaType.APPLICATION_JSON)
   public String insertProduct( Product prod ) {
	   
	  if ( dao.insertProduct(prod) )
    	  return "Inserted Successfully";
      else
    	  return "Record insertion failed!";
   }	

}
