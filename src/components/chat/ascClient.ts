
import { API_REGIONS, Client, createUserToken,  } from '@amityco/ts-sdk';
const apiKey = "b0e8e05e3b89f6374f658d4d510d42da810ddde5e9603b7f"; 
Client.createClient(apiKey, API_REGIONS.EU);
export const renewAccessToken = async (userId: string) => {
  const { accessToken } = await createUserToken(apiKey, API_REGIONS.EU, { userId });
  const sessionHandler: Amity.SessionHandler = {
    sessionWillRenewAccessToken(renewal: Amity.AccessTokenRenewal) {
      renewal.renew(); 
    },
  };

   await Client.login({ userId },   sessionHandler);
   localStorage.setItem('chat-token', accessToken);
};

