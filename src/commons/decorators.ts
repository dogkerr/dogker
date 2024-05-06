import * as grpc from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export function ValidateGrpcInput(dtoClass: any) {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const [data] = args;
      const object = plainToInstance(dtoClass, data);
      const errors = await validate(object);

      if (errors.length > 0) {
        throw new RpcException({
          code: grpc.status.INVALID_ARGUMENT,
          message: 'Input data validation failed',
        });
      }

      return originalMethod.apply(this, args);
    };
  };
}
