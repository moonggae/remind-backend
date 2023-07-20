import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class ExcludePropertyInterceptor implements NestInterceptor {
  constructor(private readonly excludeKeys: string[]) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => this.excludeProperty(data))
      );
  }

  excludeProperty(data: any): any {
    if (Array.isArray(data)) {
      return data.map(item => this.excludeProperty(item));
    } else if (typeof data === 'object' && data !== null) {
      for (const key of this.excludeKeys) {
        delete data[key];
      }
      for (const key in data) {
        this.excludeProperty(data[key]);
      }
    }
    return data;
  }
}