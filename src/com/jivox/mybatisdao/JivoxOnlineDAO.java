package com.jivox.mybatisdao;

import org.apache.ibatis.session.SqlSessionFactory;

import com.jivox.pojo.Category;
import com.jivox.pojo.Product;

public class JivoxOnlineDAO extends JdbcBaseDAO<Product, Category> {

	public JivoxOnlineDAO(SqlSessionFactory sf) {
		super(sf);
}
}
