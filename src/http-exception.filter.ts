import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof MethodNotAllowedException) {
      response.status(405).json({
        statusCode: 405,
        message: 'Method Not Allowed',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
