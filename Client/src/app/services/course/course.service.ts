import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/Course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }
  getCourse(){
    return this.httpClient.get<Course[]>("http://localhost:3000/v1/course");
 }
//  deleteItem(id:string){
//    return this.httpClient.delete<Course>(`http://localhost:3000/product/delete/${id}`)
   
//  }
//  addItem(course:Course){
//    return this.httpClient.post<Course>(`http://localhost:3000/product/create`,course)
//  }
//  updateItem(course:Course){
//    return this.httpClient.put<Course>(`http://localhost:3000/product/update/${course._id}`,course)
//  }
}
