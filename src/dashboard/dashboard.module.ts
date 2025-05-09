import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { BackendMockModule } from '../backend-mock/backend-mock.module';
import { DashboardController } from './dashboard.controller';

/**
 * ダッシュボードモジュール
 *
 * - NestJSの「モジュール」は、関連するコントローラー・サービス・プロバイダーをまとめる単位です。
 * - @Module() デコレーターは、このクラスがモジュールであることを示し、各種構成要素を登録します。
 *   - imports: 他のモジュールをインポート
 *   - providers: サービスやプロバイダーを登録
 *   - controllers: コントローラーを登録
 *   - exports: 外部に公開するサービス等を指定
 * - ファイル名に「.module.ts」と付けるのは、NestJSの命名規則で「モジュール層」を明確に区別するためです。
 */
@Module({
  imports: [BackendMockModule], // 他モジュールの機能を利用する場合はここに追加
  providers: [DashboardService], // サービス層を登録
  controllers: [DashboardController], // コントローラー層を登録
  exports: [DashboardService], // 外部に公開するサービス等を指定
})
export class DashboardModule {} // ← モジュール本体

// --- NestJS特有の主なアノテーション・用語解説 ---
// @Module: 関連するコントローラー・サービス等をまとめるNestJSのデコレーター
// モジュール: アプリケーションを機能ごとに分割・管理する単位
// .module.ts: モジュール層であることを明示するNestJSの命名規則
