package com.jivox.mybatisdao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.exceptions.PersistenceException;

public interface DAOBase<Product,Category>{
	
	/*
	 * Retrieves list of categories (id + name)
	 * @params none
	 * @returns List<String>
	 */
	public List<String> getCategories() throws PersistenceException;
	
	/*
	 * Retrieve products of a particular category
	 * @params categoryId (int)
	 * @returns List<Product>
	 */
	public ArrayList<Product> getProducts(int category) throws PersistenceException;
	
	/*
	 * Retrieve all products in the DB
	 * @params none
	 * @returns List<Product>
	 */
	public ArrayList<Product> getProductsAll() throws PersistenceException;
	
	/*
	 * Retrieve matching products where item name/item description matches query
	 * @params key (String)
	 * @returns List<Product>
	 */
	public List<Product> searchProducts(String key) throws PersistenceException;
	
	/*
	 * Retrieves list of all product names
	 * @params none
	 * @returns List<String>
	 */
	public List<String> getProductNames() throws PersistenceException;
	
	/*
	 * Retrieves list of all product descriptions
	 * @params none
	 * @returns List<String>
	 */
	public List<String> getProductDesc() throws PersistenceException;
	
	/*
	 * Inserts a new product to the DB
	 * @params prod (Product)
	 * @returns boolean (successful or not)
	 */
	public boolean insertProduct(Product prod) throws PersistenceException;
}
