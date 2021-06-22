import { Config } from '../config';

export class LinkBuilder {
    private config: Config;
    constructor(config: Config) {
        this.config = config;
    }

    toTopics(id?: number, title?: string, hash?: string): void {
        let link = this.config.TOPICS_DOMAIN;
        if (id) {
            link = `${link}/collections/${id}`;
            if (title) {
                link = `${link}/${encodeURI(title)}`;
            }
        }
        if (hash) {
            link = `${link}${hash}`;
        }
        return goTo(link);
    }

    toGuide(id?: number, title?: string, hash?: string): void {
        let link = this.config.GUIDE_DOMAIN;
        if (id) {
            link = `${link}/routes/${id}`;
            if (title) {
                link = `${link}/${encodeURI(title)}`;
            }
        }
        if (hash) {
            link = `${link}${hash}`;
        }
        return goTo(link);
    }

    toResearch(): void {
        const link = this.config.RESEARCH_DOMAIN;
        return goTo(link);
    }
}

function goTo(link: string): void {
    window.location.href = link;
}
