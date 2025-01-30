import { TypeProviderOptions } from "@/src/types/providers/provider-options.types.js";
import { BaseOathService } from "./base-outh.service.js";
import { TypeUserInfo } from "@/src/types/providers/user-info.types.js";

export class YandexProvider extends BaseOathService {
  public constructor(options: TypeProviderOptions) {
    super({
      name: "yandex",
      authorize_url: "https://oauth.yandex.ru/authorize",
      access_url: "https://oauth.yandex.ru/token",
      profile_url: "https://login.yandex.ru/info?format=json",
      scopes: options.scopes,
      client_id: options.client_id,
      client_secret: options.client_secret,
    });
  }

  public async extractUserInfo(data: YandexProfile): Promise<TypeUserInfo> {
    return super.extractUserInfo({
        email: data.emails[0],
        name: data.display_name,
        pictire: data.default_avatar_id ? `https://avatars.yandex.net/get-yapic/${data.default_avatar_id}/islands-200` : undefined
    });
  }
}

interface YandexProfile extends Record<string, any> {
  first_name?: string;
  last_name?: string;
  display_name?: string;
  emails: string[];
  default_email?: string;
  default_phone?: {
    id: number;
    number: string;
  };
  real_name?: string;
  is_avatar_empty: boolean;
  birthday?: string;
  default_avatar_id: string;
  login: string;
  old_social_login: string;
  sex?: "male" | "female" | null;
  id: string;
  client_id: string;
  psuid: string;
}
