import { Injectable } from '@nestjs/common';
import { BackendMockService } from '../backend-mock/backend-mock.service';

/**
 * ダッシュボードサービス
 *
 * - NestJSの「サービス」は、ビジネスロジックやデータ処理を担当するクラスです。
 * - @Injectable() デコレーターは、このクラスがDI（依存性注入）の対象になることを示します。
 *   - サービスはコントローラーや他のサービスから自動的にインスタンス化され、利用できます。
 * - ファイル名に「.service.ts」と付けるのは、NestJSの命名規則で「サービス層」を明確に区別するためです。
 */
@Injectable() // ← このクラスがDIの対象（サービス）であることを示すNestJS特有のアノテーション
export class DashboardService {
  /**
   * コンストラクタで他サービスを受け取る
   *
   * - DI（依存性注入）により、BackendMockServiceのインスタンスが自動で渡されます。
   * - これにより、外部APIやDBアクセスなどの処理をサービス間で分担できます。
   */
  constructor(private readonly backendMockService: BackendMockService) {}

  /**
   * ユーザーごとのタスク消化率を取得
   *
   * - サービス層では、主にビジネスロジックやデータ集計処理を実装します。
   * - コントローラーから呼び出され、APIレスポンス用のデータを生成します。
   *
   * @returns ダッシュボードデータ配列
   */
  async getDashboard(): Promise<
    {
      userId: string;
      userName: string;
      doneCount: number;
      totalCount: number;
      rate: number;
    }[]
  > {
    // ユーザー・タスク情報をモックから取得
    const [users, tasks] = await Promise.all([
      this.backendMockService.getUsers(),
      this.backendMockService.getTasks(),
    ]);

    // ユーザーごとにタスク集計
    return users.map((user) => {
      const userTasks = tasks.filter((t) => t.userId === user.id);
      const doneCount = userTasks.filter((t) => t.done).length;
      const totalCount = userTasks.length;
      const rate =
        totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);
      return {
        userId: user.id,
        userName: user.name,
        doneCount,
        totalCount,
        rate,
      };
    });
  }
}

// --- NestJS特有の主なアノテーション・用語解説 ---
// @Injectable: サービスやプロバイダーとしてDIの対象にするデコレーター
// サービス: ビジネスロジックやデータ処理を担当する層
// .service.ts: サービス層であることを明示するNestJSの命名規則
