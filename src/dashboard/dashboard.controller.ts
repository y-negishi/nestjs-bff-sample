import { Controller, Get, Headers } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthService } from '../auth/auth.service';

/**
 * ダッシュボード取得APIコントローラー
 *
 * - NestJSの「コントローラー」は、HTTPリクエストを受け付ける役割を持つクラスです。
 * - @Controller('dashboard') デコレーターは、このクラスが「/dashboard」パスへのリクエストを処理することを示します。
 *   - 例: GET /dashboard など
 * - コントローラーはサービス層（DashboardService, AuthService）をDI（依存性注入）で受け取り、ビジネスロジックを委譲します。
 */
@Controller('dashboard') // ← このクラスが「/dashboard」パスのエンドポイントを担当することを示すNestJS特有のアノテーション
export class DashboardController {
  /**
   * コンストラクタでサービス層を受け取る
   *
   * - NestJSでは、コンストラクタの引数に「private readonly サービス名: サービス型」と書くことで、
   *   DI（依存性注入）により自動的にインスタンスが渡されます。
   * - これにより、コントローラーはサービスのメソッドを利用できます。
   */
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly authService: AuthService,
  ) {}

  /**
   * ダッシュボード取得API
   *
   * - @Get() デコレーターは、このメソッドが「GET /dashboard」リクエストを処理することを示します。
   *   - @Get('foo') のように引数を指定すると「GET /dashboard/foo」になります。
   * - @Headers('authorization') デコレーターは、HTTPリクエストヘッダーから「authorization」値を取得し、引数に渡します。
   * - メソッドの戻り値はPromiseで、非同期処理（async/await）に対応しています。
   *
   * @param authorization Authorizationヘッダー
   * @returns ユーザーごとのタスク消化率配列
   */
  @Get() // ← このメソッドが「GET /dashboard」リクエストを処理することを示すNestJS特有のアノテーション
  async getDashboard(
    @Headers('authorization') authorization?: string, // ← リクエストヘッダーから値を取得するNestJSのデコレーター
  ): Promise<
    {
      userId: string;
      userName: string;
      doneCount: number;
      totalCount: number;
      rate: number;
    }[]
  > {
    // 1. 認証ヘッダーを検証（AuthServiceのメソッドを利用）
    await this.authService.validateAuthHeader(authorization);

    // 2. ダッシュボードデータを取得（DashboardServiceのメソッドを利用）
    return this.dashboardService.getDashboard();
  }
}

// --- NestJS特有の主なアノテーション・用語解説 ---
// @Controller: クラスをHTTPリクエストのエントリポイントとして登録するデコレーター
// @Get, @Post, @Put, @Delete: HTTPメソッドごとのルーティングを定義するデコレーター
// @Headers, @Body, @Param, @Query: リクエストの各種値をメソッド引数にバインドするデコレーター
// DI（依存性注入）: サービスやリポジトリなどのインスタンスを自動で注入する仕組み
