import { Pool, PoolClient } from 'pg';
import { getDatabaseConfig, getSSLConfig, dbLogger } from '../config/database';

// Проверка, находимся ли мы в процессе сборки
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                    process.env.NEXT_PHASE === 'phase-export' ||
                    !process.env.NODE_ENV;

let poolInstance: Pool | null = null;

// Функция для ленивой инициализации пула
function getPool(): Pool {
  // Во время сборки возвращаем mock pool
  if (isBuildTime) {
    return {} as Pool;
  }

  if (!poolInstance) {
    // Получаем конфигурацию базы данных только при первом использовании
    const dbConfig = getDatabaseConfig();

    // Конфигурация подключения к PostgreSQL
    poolInstance = new Pool({
      user: dbConfig.user,
      host: dbConfig.host,
      database: dbConfig.database,
      password: dbConfig.password,
      port: dbConfig.port,
      ssl: getSSLConfig(dbConfig.host),
      // Настройки пула соединений
      max: parseInt(process.env.POSTGRES_MAX_CONNECTIONS || '20'),
      idleTimeoutMillis: parseInt(process.env.POSTGRES_IDLE_TIMEOUT || '30000'),
      connectionTimeoutMillis: parseInt(process.env.POSTGRES_CONNECTION_TIMEOUT || '2000'),
    });

    // Обработка ошибок пула
    poolInstance.on('error', (err) => {
      dbLogger.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    // Логирование конфигурации при инициализации
    dbLogger.config('PostgreSQL Configuration:');
    dbLogger.config(`Host: ${dbConfig.host}:${dbConfig.port}`);
    dbLogger.config(`Database: ${dbConfig.database}`);
    dbLogger.config(`User: ${dbConfig.user}`);
    dbLogger.config(`SSL: ${JSON.stringify(getSSLConfig(dbConfig.host))}`);
  }

  return poolInstance;
}

// Экспортируем Proxy для pool, чтобы сохранить совместимость
export const pool = new Proxy({} as Pool, {
  get: (_target, prop) => {
    const actualPool = getPool();
    const value = actualPool[prop as keyof Pool];
    if (typeof value === 'function') {
      return value.bind(actualPool);
    }
    return value;
  }
});

// Функция для получения клиента (для сложных операций)
export async function getClient(): Promise<PoolClient> {
  if (isBuildTime) {
    throw new Error('Database not available during build time');
  }
  return await getPool().connect();
}

// Функция для закрытия пула соединений (для graceful shutdown)
export async function closePool(): Promise<void> {
  if (poolInstance && !isBuildTime) {
    await poolInstance.end();
    dbLogger.info('Database pool closed');
    poolInstance = null;
  }
}

export default pool;
