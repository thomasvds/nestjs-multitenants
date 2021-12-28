import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnection, getManager } from 'typeorm';
import { getTenantConnection } from './modules/tenancy/tenancy.utils';
import { tenancyMiddleware } from './modules/tenancy/tenancy.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(tenancyMiddleware);

  await getConnection().runMigrations()

  const schemas = await getManager().query('select schema_name as name from information_schema.schemata;');

  for (let i = 0; i < schemas.length; i += 1) {
    const { name: schema } = schemas[i];

    if (schema.startsWith('tenant_')) {
      const tenantId = schema.replace('tenant_', '');
      const connection = await getTenantConnection(tenantId);
      await connection.runMigrations()
      await connection.close();
    }
  }

  await app.listen(3000);
}
bootstrap();
