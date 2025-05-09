import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BackendMockModule } from '../backend-mock/backend-mock.module';

/**
 * 認証モジュール
 * BackendMockModuleをimportし、AuthServiceを提供します。
 */
@Module({
  imports: [BackendMockModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
