import React, { ReactElement, useState } from 'react';
import CollectionsContext from './CollectionsContext';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';

import { CollectionCard } from 'smb-react-components-library';
import { LinkBuilder } from '../../../Util/LinkBuilder';
import useConfigLoader from '../../../Util/ConfigLoader';

import useStyles from './collectionsModule.jss';

/**
 * CollectionModule is a wrapper component to display cards of different collections.
 * @constructor
 */
function CollectionsModule({ collectionModuleClasses = '' }: { collectionModuleClasses?: string }): ReactElement {
    const classes = useStyles();
    const { t } = useTranslation();
    const { config } = useConfigLoader();
    const link = new LinkBuilder(config);
    const [isOpen, setOpen] = useState(false);
    return (
        <CollectionsContext.Consumer>
            {(collectionsContext): ReactElement => (
                <div id={'CollectionsModule'} className={clsx(classes.container, collectionModuleClasses)}>
                    <Grid container={true} spacing={4} direction={'row'} justify={'center'} alignItems={'center'}>
                        {/* TODO implement sorting
                        <Grid item={true} xs={12} sm={12} md={12} className={classes.titleGridItem}>
                            <ButtonBase className={classes.sortCollectionsButton}>
                                <Typography className={classes.sortCollectionsButtonTypo}>{t('lastly added')}</Typography>
                                <ArrowBackIosIcon className={classes.titleArrowButton} />
                            </ButtonBase>
                        </Grid>
                        */}
                        {collectionsContext.collections.slice(0, 4).map((collectionContextData, index) => (
                            <Grid item={true} key={index} xs={12} sm={6} md={6}>
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
                    <Grid
                        style={{
                            maxHeight: isOpen ? '1600px' : 0,
                            paddingTop: '1rem',
                            transition: 'all 1s',
                            overflow: 'hidden',
                        }}
                        container={true}
                        spacing={4}
                        direction={'row'}
                        justify={'center'}
                        alignItems={'center'}
                    >
                        {collectionsContext.collections
                            .slice(collectionsContext.collections.length - 2)
                            .map((collectionContextData, index) => (
                                <Grid item={true} key={index} xs={12} sm={6} md={6}>
                                    <CollectionCard
                                        image={collectionContextData.previewImageCard}
                                        title={collectionContextData.title}
                                        subtitle={collectionContextData.subtitle}
                                        actionText={t('collections module discover button')}
                                        tintColor={'rgba(0, 0, 0, 0.5)'}
                                        count={collectionContextData.collectionObjects.length}
                                        onClick={() =>
                                            link.toTopics(collectionContextData.id, collectionContextData.title)
                                        }
                                    />
                                </Grid>
                            ))}
                    </Grid>
                    <Grid
                        style={{
                            display: !isOpen ? 'flex' : 'none',
                        }}
                        container={true}
                        spacing={4}
                        direction={'row'}
                        justify={'center'}
                        alignItems={'center'}
                    >
                        <Grid item={true} xs={12} sm={12} md={12} lg={12} className={classes.titleGridItem}>
                            <ButtonBase onClick={() => setOpen(!isOpen)} className={classes.buttonTitle}>
                                <span>
                                    <Typography variant={'h3'} className={classes.showAllButtonTypo}>
                                        {t('collections module show all button')}
                                    </Typography>
                                    <ArrowRightAltOutlinedIcon className={classes.endArrowButton} fontSize={'large'} />
                                </span>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </div>
            )}
        </CollectionsContext.Consumer>
    );
}

export default CollectionsModule;
