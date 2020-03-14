import { AppContext } from 'next/app';

/**
 * todo: expand this with the metadata desired by data analysts
 * @param appContext
 */
export const getMetadata = (appContext: AppContext) => ({
  'user_agent': appContext.ctx.req.headers['user-agent'],
  'host': appContext.ctx.req.headers.host,
  'url': appContext.ctx.req.url
});


