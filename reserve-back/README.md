# back-end 프로젝트 구축을 위해 사용한 것들

## Used Site

1. https://docs.nestjs.com/


## Main Used Stack

1. typescript
2. nestjs
  * 명령어(@nestjs/cli)
    * nest new project-name
    * nest g resource products
    * nest g module products
    * nest g service products
    * nest g controller products
3. typeorm
4. jwt
5. socket.io
6. class-validator
7. cache-manager(redis-store)
8. crypto


## Used Visual Studio Code Plugin

1. Prettier
2. Rainbow Brackets
3. ESLint (airbnb)
  * npm info "eslint-config-airbnb@latest" peerDependencies
  * npx install-peerdeps --dev eslint-config-airbnb
  * npm install --legacy-peer-deps


## 설정 파일 추가

> .env : 각종 설정

```bash
REDIS_PORT=6379
REDIS_HOST=localhost
CACHE_TTL=3600
WAIT_ROOM_MEMBER_COUNT=1
CORS_ORIGIN=http://localhost
JWT_SECRET_KEY=EXAMPLE_KEY
```

> ormconfig.ts : DB설정

```javascript
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: '',
  password: '',
  database: '',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  logging: 'all',
  migrations: ['dist/src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
```

> appspec.yml : codeDeploy 사용 시 필요한 파일