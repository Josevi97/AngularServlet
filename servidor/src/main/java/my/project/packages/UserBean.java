package my.project.packages;

public class UserBean {
    String username;
    String password;
    
    public UserBean(String username, String password) {
        this.username = username;
        this.password = password;
    }
    
    public String getUsername() { return this.username; }
    public String getPassword() { return this.username; }
    
    public boolean isValid() { return this.username != null && this.password != null; }
    public boolean check(String username, String password) {
        return (
            this.username.equalsIgnoreCase(username) && 
            this.password.equalsIgnoreCase(password)
        );
    }
}