import { RequestHandler, Router } from 'express';

export interface CustomRouter extends Router {
  mainPath?: string;
  endpoints?: Endpoint[];
  // registerEndpoints?: (r : CustomRouter) => void;
}

type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';
export interface Endpoint {
  path: string;
  method: HttpMethod;
  controller: RequestHandler;
  middleware?: RequestHandler[];
}
