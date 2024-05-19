import { RequestHandler, Router } from 'express';


// Note: The endpoints property is defined as optional (?), which means it may or may not be present in the CustomRouter instances. 
// This property is typically used internally within the file where the router is created and configured, and it is  the default behaviour that it will be undefined after registering the routes. 
export interface CustomRouter extends Router {
  rootPath?: string;
  endpoints?: Endpoint[];
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
