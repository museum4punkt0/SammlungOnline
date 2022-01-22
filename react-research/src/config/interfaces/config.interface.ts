import { AppStage } from '../enums/app-stage.enum';

export interface IConfiguration {
  stage: AppStage;
  PRODUCTION_READY: boolean;
  IMAGE_PROVIDER_DOMAIN: string;
  IMAGE_PROVIDER_ENDPOINT: string;
  GRAPHQL_ENDPOINT: string;
  INTRO_DOMAIN: string;
  TOPICS_DOMAIN: string;
  GUIDE_DOMAIN: string;
  RESEARCH_DOMAIN: string;
  ELASTIC_API_URL: string;
}
