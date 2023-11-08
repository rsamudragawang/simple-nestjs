import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const devConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: '192.168.18.232',
  port: 5432,
  username: 'simplenest',
  password: 'rxR4mPyH8shSE7Pb',
  database: 'simplenest',
  entities: ['dist/**/*.entity{.ts,.js}'],
  ssl: false,
  synchronize: true,
};
