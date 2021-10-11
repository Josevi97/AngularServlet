import { HttpHeaders } from "@angular/common/http";

export const environment = {
    production: false
};

export const API_URI: string = 'http://localhost:8081/Project';

export const httpOptions = {                                                                                            
    headers: new HttpHeaders({                                                                                            
        'Content-Type': 'application/json; charset=UTF-8'                                                                                                                        
    }),                                                                                                                   
    withCredentials: true                                                                                                 
};

export let USER_ITEM = 'user';
