import { HttpHeaders } from "@angular/common/http";

export const httpOptionsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
})

export const httpOptions = {
    headers: httpOptionsHeaders
};