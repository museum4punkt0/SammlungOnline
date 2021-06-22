import React, { ReactElement, useState } from 'react';
import { ConfigLoader } from '../../Util/ConfigLoader';
import CollectionContext from '../Components/Collection/CollectionContext';
import { useHistory, useLocation } from 'react-router-dom';
import LocationFilter from '../../Util/LocationFilter';
import CollectionModule from '../Components/Collection/CollectionModule';
import { useTranslation } from 'react-i18next';
import CollectionPlayerModule from '../Components/CollectionPlayer/CollectionPlayerModule';
import CollectionsDiscoverModule from '../Components/Collection/CollectionsDiscoverModule';
import CollectionsContext, { CollectionsContextData } from '../Components/Collection/CollectionsContext';
import TopicsService from '../../Services/TopicsService';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import useStyles from './collectionPlayerPage.jss';
import {Redirect} from "react-router";

function CollectionPlayerPage(): ReactElement {
    const classes = useStyles();
    const config = ConfigLoader.CurrentConfig;
    const location = useLocation();
    const [selectedObjectIndex, setSelectedObjectIndex] = useState<number | undefined>(undefined);
    const { t } = useTranslation();
    const topicsService = new TopicsService();
    const locationFilter = new LocationFilter(location);
    const id = parseInt(locationFilter.getPathParam(1));
    const topicData = topicsService.getTopic(id);
    const topicsData = topicsService.getTopics();
    const history = useHistory();

    if (!topicData.loading && !topicData.contextData) {
        return <Redirect to='/404' />
    }

    if (topicData.loading || topicsData.loading || !topicData.contextData || !topicsData.contextData) {
        return (
            <div className={classes.content}>
                <LoadingSpinner />
            </div>
        );
    }

    const intervalTime = locationFilter.getQueryParam('t');
    const interval = intervalTime ? Number.parseInt(intervalTime) : config.MEDIA_PLAYER_INTERVAL;

    const collectionContext = {
        ...topicData.contextData,
        interval: interval,
        selectedObjectIndex: selectedObjectIndex,
        onCollectionObjectSelected: (index: number): void => setSelectedObjectIndex(index),
    };

    const onCollectionClick = (id: number, title: string): void => {
        history.push(`/collections/${id}/${title}`);
    };
    const collectionsContext: CollectionsContextData = {
        collections: topicsData.contextData,
        onCollectionClick: onCollectionClick,
    };

    return (
        <div className={classes.content}>
            <CollectionContext.Provider value={collectionContext}>
                <CollectionPlayerModule
                    interval={interval}
                    wrapperClasses={classes.collectionPlayerHeight}
                    previewWrapperClasses={classes.collectionPreviewHeight}
                    mediaPlayerClasses={classes.collectionPlayerHeight}
                />
                <CollectionModule
                    title={t('collection scroll to discover')}
                    bottomTitle={t('collection scroll to player')}
                />
            </CollectionContext.Provider>
            <CollectionsContext.Provider value={collectionsContext}>
                <CollectionsDiscoverModule collectionModuleClasses={classes.collectionsDiscoverModule} />
            </CollectionsContext.Provider>
        </div>
    );
}

export default CollectionPlayerPage;
