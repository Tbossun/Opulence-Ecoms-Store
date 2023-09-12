import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Alabiboy@1',
  database: 'opulencenestdb',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Set to true for development, but false for production
  logging: true,
};
