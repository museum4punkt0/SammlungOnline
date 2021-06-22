import { ConfigLoader } from './ConfigLoader';
import { Config } from '../config';

// const config = ConfigLoader.CurrentConfig;


// export class LinkBuilder {
//     toTopics(id: number, title: string): void {
//         const link = `${config.TOPICS_DOMAIN}/collections/${id}/${encodeURI(title)}`;
//         return goTo(link);
//     }
//     // todo build link with anker
//     toGuide(id: number, title: string): void {
//         const link = `${config.GUIDE_DOMAIN}/guide/${id}/${encodeURI(title)}`;
//         return goTo(link);
//     }
//     toResearch(): void {
//         const link = config.RESEARCH_DOMAIN;
//         return goTo(link);
//     }
// }

export class LinkBuilder {
    private config: Config;
    constructor() {
        this.config = ConfigLoader.CurrentConfig;
    }
    toTopics(id?: number, title?: string, hash?: string): void {
        let link = this.config.TOPICS_DOMAIN;
        if (id && title) {
            link = `${link}${hash}`;
        }
        if (id && title) {
            link = `${link}/collections/${id}/${encodeURI(title)}`;
        }

        return goTo(link);
    }
    toTopicsHashed(hash: string): void {
        const link = this.config.TOPICS_DOMAIN + hash;
        goTo(link);
    }
    toObject(id?: string){
        let link = this.config.RESEARCH_DOMAIN;
        if (id) {
            link = `${link}/detail/${id}`;
        }
        return goTo(link);
    }
    getObjectUrl(id?: string): string{
        let link = this.config.RESEARCH_DOMAIN;
        if (id) {
            link = `${link}/detail/${id}`;
        }
        return link;
    }
    toGuide(id?: number, title?: string): void {
        let link = this.config.GUIDE_DOMAIN;
        if (id && title) {
            link = `${link}/tour/${id}/${encodeURI(title)}`;
        }
        return goTo(link);
    }

    public createLinkToGuideStation(id: number, title: string, station: string): string {
        let link = this.config.GUIDE_DOMAIN;

        return`${link}/tour/${id}/${encodeURI(title)}#${station}`;
    }

    toGuideStation(id?: number, title?: string, station?: string): void {
        let link = this.config.GUIDE_DOMAIN;
        if (id && title) {
            link = `${link}/tour/${id}/${encodeURI(title)}#${station}`;
        }
        return goTo(link);
    }
    toResearch(): void {
        const link = this.config.RESEARCH_DOMAIN;
        return goTo(link);
    }
    goTo(link: string): void {
        window.location.href = link;
    }
}

function goTo(link: string): void {
    window.location.href = link;
}
