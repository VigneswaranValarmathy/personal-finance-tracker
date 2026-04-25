package com.finance.servlets;

import javax.servlet.http.*;

import com.finance.db.DBConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.io.IOException;
import javax.servlet.ServletException;

public class AddTransactionServlet extends HttpServlet{

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        String email = request.getParameter("email");
        double amount = Double.parseDouble(request.getParameter("amount"));
        String category = request.getParameter("category");
        String type = request.getParameter("type");
        String date = request.getParameter("date");

        try{
            Connection con = DBConnection.getConnection();

            String query ="INSERT INTO transactions(email, amount, category, type, date) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, email);
            ps.setDouble(2, amount);
            ps.setString(3, category);
            ps.setString(4, type);
            ps.setString(5, date);

            int result = ps.executeUpdate();

            if(result > 0){
                response.getWriter().write("success");
            }else{
                response.getWriter().write("fail");
            }
        }catch(Exception e){
            e.printStackTrace();
            response.getWriter().write("error");
        }

    }
}