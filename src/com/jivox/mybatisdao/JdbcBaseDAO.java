package com.jivox.mybatisdao;


import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Context;

import org.apache.ibatis.exceptions.PersistenceException;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;
import org.jboss.netty.handler.codec.http.HttpResponse;

public class JdbcBaseDAO<Product,Category> implements DAOBase<Product,Category> {
	
	    private static Logger log = Logger.getLogger(JdbcBaseDAO.class);
	    private SqlSessionFactory sqlSessionFactory;
	    
	    private static final String NAMESPACE = "jivoxonline";

	    public JdbcBaseDAO(SqlSessionFactory sf) {
		this.sqlSessionFactory = sf;
		if (sf == null)
		    log.error("Error: sessionFactory loading failed.");
	    }

	   	@SuppressWarnings("unchecked")
		public List<String> getCategories() throws PersistenceException {
	   		
	   		SqlSession session = sqlSessionFactory.openSession();
			List<String> categoryList = null;
			try {
			    	String query = NAMESPACE + ".getCategories";
			    	categoryList = (List<String>) session.selectList(query);
			    	
			    	//Debug
			    	//System.out.println(categoryList);
			}
			catch (Exception e){
				e.printStackTrace();
			}
			finally {
			    session.close();
			}
			return categoryList;
	   		
	   	}
	   	
	   	@SuppressWarnings("unchecked")
		public List<String> getCategoriesFull() throws PersistenceException {
	   		
	   		SqlSession session = sqlSessionFactory.openSession();
			List<String> categoryList = null;
			try {
			    	String query = NAMESPACE + ".getCategoriesFull";
			    	categoryList = (List<String>) session.selectList(query);
			}
			catch (Exception e){
				e.printStackTrace();
			}
			finally {
			    session.close();
			}
			return categoryList;
	   		
	   	}
	   	
		@SuppressWarnings("unchecked")
		public ArrayList<Product> getProducts(int category) throws PersistenceException {
			
			SqlSession session = sqlSessionFactory.openSession();
			ArrayList<Product> productList = null;
			try {
			    	String query = NAMESPACE + ".getProducts";
			    	productList = (ArrayList<Product>) session.selectList(query, category);
			}
			catch (Exception e){
				e.printStackTrace();
			}
			finally {
			    session.close();
			}
			return productList;
		}
		
		@SuppressWarnings("unchecked")
		public ArrayList<Product> getProductsAll() throws PersistenceException {
			SqlSession session = sqlSessionFactory.openSession();
			ArrayList<Product> productList = null;
			try {
			    	String query = NAMESPACE + ".getProductsAll";
			    	productList = (ArrayList<Product>) session.selectList(query);
			}
			catch (Exception e){
				e.printStackTrace();
			}
			finally {
			    session.close();
			}
			return productList;
			
		}
		
		@SuppressWarnings("unchecked")
		public List<String> getProductNames() throws PersistenceException {
			SqlSession session = sqlSessionFactory.openSession();
			List<String> productNames = null;
			try {
			    	String query = NAMESPACE + ".getProductNames";
			    	productNames = (List<String>) session.selectList(query);
			}
			catch (Exception e){
				e.printStackTrace();
			}
			finally {
			    session.close();
			}
			return productNames;
			
		}
		
		@SuppressWarnings("unchecked")
		public List<String> getProductDesc() throws PersistenceException {
			SqlSession session = sqlSessionFactory.openSession();
			List<String> productDescs = null;
			try {
			    	String query = NAMESPACE + ".getProductDesc";
			    	productDescs = (List<String>) session.selectList(query);
			}
			catch (Exception e){
				e.printStackTrace();
			}
			finally {
			    session.close();
			}
			return productDescs;
		
		}
		
		@SuppressWarnings("unchecked")
		public List<Product> searchProducts(String key) throws PersistenceException {
			SqlSession session = sqlSessionFactory.openSession();
			List<Product> products = null;
			try {
			    	String query = NAMESPACE + ".getProducts_name";
			    	products = (List<Product>) session.selectList(query, "%"+key+"%");
			}
			catch (Exception e){
				e.printStackTrace();
			}
			finally {
			    session.close();
			}
			return products;
			
		}
		
		public boolean insertProduct(Product prod) throws PersistenceException { 
			boolean res = true;
			SqlSession session = sqlSessionFactory.openSession();
			
			try {
			    	String query = NAMESPACE + ".insertProduct";
			    	System.out.println(session.insert(query, prod));
			    	session.commit();
			} 
			catch (Exception e){
				e.printStackTrace();
				res = false;
			}
			finally {
			    session.close();
			}
			return res;
		}

}
