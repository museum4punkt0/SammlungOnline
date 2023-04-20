import { AppStage } from '../enums/index';

export interface IConfiguration {
  stage: AppStage;
  PRODUCTION_READY: boolean;
  IMAGE_PROVIDER_ENDPOINT: string;
  GRAPHQL_ENDPOINT: string;
  ELASTIC_API_URL: string;
  INTRO_DOMAIN: string;
  TOPICS_DOMAIN: string;
  RESEARCH_DOMAIN: string;
  GUIDE_DOMAIN: string;
}
