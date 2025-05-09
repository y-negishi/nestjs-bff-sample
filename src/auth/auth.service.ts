import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BackendMockService } from '../backend-mock/backend-mock.service';

/**
 * 認証サービス
 * - リクエストヘッダーから認証情報を抽出・検証
 * - バックエンドの認証API（モック）を呼び出し
 */
@Injectable()
export class AuthService {
  constructor(private readonly backendMockService: BackendMockService) {}

  /**
   * 認証トークンを検証する
   * @param authHeader Authorizationヘッダー値
   * @throws UnauthorizedException 認証失敗時
   */
  async validateAuthHeader(authHeader?: string): Promise<void> {
    // ヘッダーが存在しない場合は401
    if (!authHeader) {
      throw new UnauthorizedException('認証情報がありません');
    }
    // Bearerトークン形式を想定
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) {
      throw new UnauthorizedException('認証形式が不正です');
    }
    const token = match[1];
    const ok = await this.backendMockService.authenticate(token);
    if (!ok) {
      throw new UnauthorizedException('認証に失敗しました');
    }
    // 認証成功時は何も返さない
  }
}
