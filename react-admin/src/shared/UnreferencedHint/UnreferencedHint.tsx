import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';

function UnreferencedHint(): ReactElement {
    return (
        <div>
            <Typography variant={'body1'}>
                Zur Vermeidung von unreferenzierten Einträgen (Karteileichen), muss ein Topic zunächst erstellt werden
                und im Anschluss über die Editierfunktion die Übersetzungen zu Titel und Beschreibung angegeben werden.
            </Typography>
        </div>
    );
}

export default UnreferencedHint;
