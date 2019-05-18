import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

export interface IRepository {
  id: number
  title: string
}

@Injectable()
export class RepositoryService {
  constructor(private http: HttpClient) {}

  getAllRepositories() {
    return this.http.get<IRepository[]>(
      'https://jsonplaceholder.typicode.com/todos',
    )
  }
}
