import axios from 'axios';

const ENDPOINT_USERS = process?.env?.ENDPOINT_USERS || '';

export const getUserService = async (
  accessToken: string,
  userId: number,
): Promise<Record<string, unknown>> => {
  try {
    return await axios.post(
      `${ENDPOINT_USERS}/user`,
      { userId },
      {
        headers: {
          authentication: `Bearer ${accessToken}`,
        },
      },
    );
  } catch (e: unknown) {
    return (e as Record<string, Record<string, unknown>>)?.response;
  }
};
