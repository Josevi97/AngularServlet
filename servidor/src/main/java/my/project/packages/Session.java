package my.project.packages;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class Session extends HttpServlet {
    public static final String CHECK = "check";
    public static final String GET = "get";
    
    private final String OPERATION = "op";
    private final String USER_SESSION = "user";
    private final String METHOD_NOT_ALLOWED_MESSAGE = "Method not allowed";
    private final String UNAUTHORIZED_MESSAGE = "Unauthorized";
    
    private final Gson gson = new Gson();
      
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        
        doCORS(request, response);
        
        try (PrintWriter writer = response.getWriter()) {
            String operation = request.getParameter(OPERATION);
            HttpSession session = request.getSession();
            UserBean userBean = (UserBean)session.getAttribute(USER_SESSION);
            
            int state = HttpServletResponse.SC_METHOD_NOT_ALLOWED;
            String message = METHOD_NOT_ALLOWED_MESSAGE;
            
            if (operation != null && userBean != null) {
                switch (operation) {
                    case CHECK:
                        state = HttpServletResponse.SC_OK;
                        message = userBean.getUsername();
                        break;
                    
                    case GET:
                        String code = userBean.check("admin", "12345") ?
                            "AQHFFA" : userBean.check("user", "12345") ?
                                "MNASTU" : null;

                        if (code != null) {
                            state = HttpServletResponse.SC_OK;
                            message = code;
                        }
                        break;
                }
            }
            
            response.setStatus(state);
            writer.print(gson.toJson(message));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        
        doCORS(request, response);
        
        try (PrintWriter writer = response.getWriter()) {
            UserBean userBean = gson.fromJson(getBody(request), UserBean.class);
            HttpSession session = request.getSession();
            
            int state = HttpServletResponse.SC_METHOD_NOT_ALLOWED;
            String message = UNAUTHORIZED_MESSAGE;
            
            if (userBean != null && userBean.isValid() && (
                userBean.check("admin", "12345") || userBean.check("user", "12345"))) {
                
                state = HttpServletResponse.SC_OK;
                message = "Welcome";
            }
            
            response.setStatus(state);
            writer.print(gson.toJson(message));

            session.setAttribute(USER_SESSION, userBean);
        }
    }
    
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        
        doCORS(request, response);
        
        try (PrintWriter writer = response.getWriter()) {
            HttpSession session = request.getSession();
            
            int state = HttpServletResponse.SC_METHOD_NOT_ALLOWED;
            String message = METHOD_NOT_ALLOWED_MESSAGE;
            
            if (session.getAttribute(USER_SESSION) != null) {
                state = HttpServletResponse.SC_OK;
                message = "Goodbye";
                
                session.invalidate();
            }
            
            response.setStatus(state);
            writer.print(gson.toJson(message));
        }
    }
    
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        
        doCORS(request, response);
    }
    
    private void doCORS(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("application/json;charset=UTF-8");
        
        if (!request.getMethod().equalsIgnoreCase("OPTIONS")) {
            response.setHeader("Cache-control", "no-cache, no-store");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Expires", "-1");
            response.setHeader("Access-Control-Max-Age", "86400");
            
        } else response.setHeader("Access-Control-Max-Age", "3600");
        
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("origin"));
        response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,HEAD,PATCH");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader(
            "Access-Control-Allow-Headers", 
            "Access-Control-Allow-Headers, "
                + "Origin, "
                + "Accept, "
                + "Authorization, "
                + "ResponseType, "
                + "Observe, "
                + "X-Requested-With, "
                + "Content-Type, "
                + "Access-Control-Expose-Headers, "
                + "Access-Control-Request-Method, "
                + "Access-Control-Request-Headers"
        );
        
        response.setStatus(HttpServletResponse.SC_OK);
    }
    
    private static String getBody(HttpServletRequest request) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();

        try (
                InputStream inputStream = request.getInputStream(); 
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream))) {
            
            if (inputStream == null) return "";
            
            char[] charBuffer = new char[128];
            int bytesRead = -1;

            while ((bytesRead = bufferedReader.read(charBuffer)) > 0)
                stringBuilder.append(charBuffer, 0, bytesRead);
        }

        return stringBuilder.toString();
    }
}
