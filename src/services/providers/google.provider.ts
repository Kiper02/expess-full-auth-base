import { TypeProviderOptions } from "@/src/types/providers/provider-options.types.js";
import { BaseOathService } from "./base-outh.service.js";
import { TypeUserInfo } from "@/src/types/providers/user-info.types.js";

export class GoogleProvider extends BaseOathService {
  public constructor(options: TypeProviderOptions) {
    super({
      name: "google",
      authorize_url: "https://accounts.google.com/o/oauth2/v2/auth",
      access_url: "https://oauth2.googleapis.com/token",
      profile_url: "https://www.googleapis.com/oauth2/v3/userinfo",
      scopes: options.scopes,
      client_id: options.client_id,
      client_secret: options.client_secret,
    });
  }

  public async extractUserInfo(data: GoogleProfile): Promise<TypeUserInfo> {
    return super.extractUserInfo({
        email: data.email,
        name: data.name,
        picture: data.picture
    })  
  }
}

interface GoogleProfile extends Record<string, any> {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
  hd: string;
  access_token: string;
  refresh_token: string;
}
