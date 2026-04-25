package com.finance.servlets;

import javax.servlet.http.*;
import java.io.IOException;
import java.sql.Connection;
import com.finance.db.DBConnection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletException;

public class LoginServlet extends HttpServlet{
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
        throws ServletException, IOException{

    String email = request.getParameter("email");      //getting and storing data from url 
    String password = request.getParameter("password");
    
    try{
        Connection con = DBConnection.getConnection();  //getting connection with database

        String query = "SELECT * FROM users WHERE email=? AND password =?";
        PreparedStatement ps = con.prepareStatement(query);  

        ps.setString(1, email);    // adds the value to prepared string statement
        ps.setString(2, password);

        ResultSet rs = ps.executeQuery(); //executes the prepared statement
 // Moves and checks data inside table row by row 
        if(rs.next()){
            response.getWriter().write("success");
        }else{
            response.getWriter().write("fail");
        }        
    }catch(Exception e){
        e.printStackTrace();
        response.getWriter().write("error"); // server print statement
    }   
    
}
}