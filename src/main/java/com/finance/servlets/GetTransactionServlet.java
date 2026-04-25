package com.finance.servlets;

import java.io.IOException;
import com.finance.db.DBConnection;
import javax.servlet.http.*;
import javax.servlet.ServletException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class GetTransactionServlet extends HttpServlet{
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        String email = request.getParameter("email");

        try{
            Connection con = DBConnection.getConnection();
        String query = "SELECT * FROM transactions WHERE email=?";
        PreparedStatement ps = con.prepareStatement(query);
        ps.setString(1, email);
        ResultSet rs = ps.executeQuery();

        StringBuilder json = new StringBuilder("[");
        boolean first = true;

        while (rs.next()){
            if(!first){
                json.append(",");
            }

            json.append("{")
            	.append("\"id\":").append(rs.getInt("id")).append(",")
                .append("\"amount\":").append(rs.getDouble("amount")).append(",")
                    .append("\"category\":\"").append(rs.getString("category")).append("\",")
                    .append("\"type\":\"").append(rs.getString("type")).append("\",")
                    .append("\"date\":\"").append(rs.getString("date")).append("\"")
                    .append("}");
            first = false;
        }

        json.append("]");

        response.getWriter().write(json.toString());
    }catch(Exception e){
        e.printStackTrace();
        response.getWriter().write("[]");
    }
}
}
