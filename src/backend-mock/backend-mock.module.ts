import { Module } from '@nestjs/common';
import { BackendMockService } from './backend-mock.service';

/**
 * バックエンドAPIモック用モジュール
 * 他モジュールからBackendMockServiceを利用できるようエクスポートします。
 */
@Module({
  providers: [BackendMockService],
  exports: [BackendMockService],
})
export class BackendMockModule {}
