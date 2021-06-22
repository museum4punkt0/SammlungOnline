import { Grid } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { CollectionCard } from 'smb-react-components-library';
import useConfigLoader from '../../../Util/ConfigLoader';
import { LinkBuilder } from '../../../Util/LinkBuilder';
// import CollectionCard from './CollectionCard';
import CollectionsContext from './CollectionsContext';
import useStyles from './collectionsDiscoverModule.jss';
// TODO: Probably this implementation is not necessary, CollectionsModule could be used instead.

function CollectionsDiscoverModule({
    collectionModuleClasses = '',
}: {
    collectionModuleClasses?: string;
}): ReactElement {
    const classes = useStyles();
    const { t } = useTranslation();
    const { config } = useConfigLoader();
    const link = new LinkBuilder(config);
    return (
        <CollectionsContext.Consumer>
            {(collectionsContext): ReactElement => (
                <div id={'CollectionsModule'} className={clsx(classes.container, collectionModuleClasses)}>
                    <Grid
                        container={true}
                        className={classes.gridContainer}
                        spacing={4}
                        direction={'row'}
                        justify={'center'}
                        alignItems={'center'}
                    >
                        <Grid item={true} xs={12} className={classes.titleGridItem}>
                            <ButtonBase
                                onClick={() => link.toTopics(undefined, undefined, '#topics')}
                                className={classes.titleButton}
                            >
                                <Typography className={classes.titleButtonTypo}>
                                    {t('discover other collections')}
                                </Typography>
                                <ArrowRightAltOutlinedIcon className={classes.titleArrowButton} fontSize={'large'} />
                            </ButtonBase>
                        </Grid>

                        {collectionsContext.collections.map((collectionContextData, index) => (
                            <Grid item={true} key={index} xs={12} sm={6}>
                                <CollectionCard
                                    image={collectionContextData.previewImageCard}
                                    title={collectionContextData.title}
                                    subtitle={collectionContextData.subtitle}
                                    actionText={t('collections module discover button')}
                                    tintColor={'rgba(0, 0, 0, 0.5)'}
                                    count={collectionContextData.collectionObjects.length}
                                    onClick={() => link.toTopics(collectionContextData.id, collectionContextData.title)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </CollectionsContext.Consumer>
    );
}

export default CollectionsDiscoverModule;
