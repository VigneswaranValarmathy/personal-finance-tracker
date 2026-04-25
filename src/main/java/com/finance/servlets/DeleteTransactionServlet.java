package com.finance.servlets;
import javax.servlet.http.*;
import java.io.IOException;
import javax.servlet.ServletException;
import java.sql.*;
import com.finance.db.DBConnection;

public class DeleteTransactionServlet extends HttpServlet{
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException{
	
		String id =  request.getParameter("id");
	
	
	try {
		Connection con = DBConnection.getConnection();
		String query = "DELETE FROM transactions WHERE id=?";
		PreparedStatement ps= con.prepareStatement(query);
		ps.setInt(1, Integer.parseInt(id));
		int result = ps.executeUpdate();
	
		if(result > 0) {
			response.getWriter().write("success");
		}else {
			response.getWriter().write("fail");
		}
	}catch(Exception e) {
		e.printStackTrace();
		response.getWriter().write("error");
	}
		
	}

	
}