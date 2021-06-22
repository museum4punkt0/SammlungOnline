import { IConfiguration } from '../interfaces/config.interface';

export class LinkBuilder {
    constructor(private readonly _config: IConfiguration) {}

    toTopics(id: number, title: string): void {
        const link = `${this._config.TOPICS_DOMAIN}/collections/${id}/${encodeURI(title)}`;
        return goTo(link);
    }
    toGuide(id: number, title: string): void {
        const link = `${this._config.GUIDE_DOMAIN}/tour/${id}/${encodeURI(title)}`;
        return goTo(link);
    }
}

function goTo(link: string): void {
    window.location.href = link;
}
