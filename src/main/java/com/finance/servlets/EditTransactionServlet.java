package com.finance.servlets;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import com.finance.db.DBConnection;

public class EditTransactionServlet extends HttpServlet{
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		
		int id = Integer.parseInt(request.getParameter("id"));
		double amount = Double.parseDouble(request.getParameter("amount"));
		String category = request.getParameter("category");
		String type = request.getParameter("type");
		String date = request.getParameter("date");
		
		try {
			Connection con = DBConnection.getConnection();
			String query = "UPDATE transactions SET amount=?, category=?, type=?, date=? WHERE id=?";
			PreparedStatement ps = con.prepareStatement(query);
			ps.setDouble(1, amount);
			ps.setString(2, category);
			ps.setString(3, type);
			ps.setString(4, date);
			ps.setInt(5, id);
			
			int result = ps.executeUpdate();
			if(result > 0){
				response.getWriter().write("success");
			}else {
				response.getWriter().write("failed");
			}
		}catch(Exception e){
			e.printStackTrace();
			response.getWriter().write("error");
		}
	}
}