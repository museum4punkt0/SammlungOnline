import { TranslationMessages } from 'ra-core';

const germanMessages: TranslationMessages = {
    ra: {
        action: {
            create_item: 'Eintrag erstellen',
            add_filter: 'Filter hinzufügen',
            add: 'Neu',
            back: 'Zurück',
            bulk_actions: 'Ein Element ausgewählt |||| %{smart_count} Elemente ausgewählt',
            cancel: 'Abbrechen',
            clear_input_value: 'Eingabe löschen',
            clone: 'Klonen',
            confirm: 'Bestätigen',
            create: 'Erstellen',
            delete: 'Löschen',
            edit: 'Bearbeiten',
            export: 'Exportieren',
            list: 'Liste',
            refresh: 'Aktualisieren',
            remove_filter: 'Filter entfernen',
            remove: 'Entfernen',
            save: 'Speichern',
            search: 'Suchen',
            show: 'Anzeigen',
            sort: 'Sortieren',
            undo: 'Zurücksetzen',
            unselect: 'Abwählen',
            expand: 'Erweitern',
            close: 'Schliessen',
            open_menu: 'Öffnen des Menüs',
            close_menu: 'Schliessen des Menüs',
        },
        boolean: {
            true: 'Ja',
            false: 'Nein',
            null: '',
        },
        page: {
            create: '%{name} erstellen',
            dashboard: 'Dashboard',
            edit: '%{name} #%{id}',
            error: 'Etwas ist schief gelaufen',
            list: '%{name}',
            loading: 'Die Seite wird geladen.',
            not_found: 'Nicht gefunden',
            show: '%{name} #%{id}',
            empty: 'Noch kein %{name}.',
            invite: 'Neu erstellen?',
        },
        input: {
            file: {
                upload_several: 'Zum Hochladen Dateien hineinziehen oder hier klicken, um Dateien auszuwählen.',
                upload_single: 'Zum Hochladen Datei hineinziehen oder hier klicken, um eine Datei auszuwählen.',
            },
            image: {
                upload_several: 'Zum Hochladen Bilder hineinziehen oder hier klicken, um Bilder auszuwählen.',
                upload_single: 'Zum Hochladen Bild hineinziehen oder hier klicken, um ein Bild auszuwählen.',
            },
            references: {
                all_missing: 'Die zugehörigen Referenzen konnten nicht gefunden werden.',
                many_missing: 'Mindestens eine der zugehörigen Referenzen scheint nicht mehr verfügbar zu sein.',
                single_missing: 'Eine zugehörige Referenz scheint nicht mehr verfügbar zu sein.',
            },
            password: {
                toggle_visible: 'Passwort ausblenden',
                toggle_hidden: 'Passwort einblenden',
            },
        },
        message: {
            about: 'Über',
            are_you_sure: 'Sind Sie sicher?',
            bulk_delete_content:
                'Möchten Sie "%{name}" wirklich löschen? |||| Möchten Sie diese %{smart_count} Elemente wirklich löschen?',
            bulk_delete_title: 'Lösche %{name} |||| Lösche %{smart_count} %{name} Elemente',
            delete_content: 'Möchten Sie diesen Inhalt wirklich löschen?',
            delete_title: 'Lösche %{name} #%{id}',
            details: 'Details',
            error: 'Ein Fehler ist aufgetreten und Ihre Anfrage konnte nicht abgeschlossen werden.',
            invalid_form: 'Das Formular ist ungültig. Bitte überprüfen Sie Ihre Eingaben.',
            loading: 'Die Seite wird geladen, bitte haben Sie etwas Geduld.',
            no: 'Nein',
            not_found: 'Die Seite konnte nicht gefunden werden.',
            yes: 'Ja',
            unsaved_changes:
                'Einige Änderungen wurden nicht gespeichert. Sind Sie sicher, dass Sie diese Seite verlassen wollen?',
        },
        navigation: {
            no_results: 'Keine Resultate gefunden',
            no_more_results: 'Die Seite %{page} enthält keine Inhalte.',
            page_out_of_boundaries: 'Die Seite %{page} liegt ausserhalb des gültigen Bereichs',
            page_out_from_end: 'Letzte Seite',
            page_out_from_begin: 'Erste Seite',
            page_range_info: '%{offsetBegin}-%{offsetEnd} von %{total}',
            page_rows_per_page: 'Zeilen pro Seite:',
            next: 'Weiter',
            prev: 'Zurück',
            skip_nav: 'Zum Inhalt springen',
        },
        sort: {
            sort_by: 'Sortieren nach %{field} %{order}',
            ASC: 'aufsteigend',
            DESC: 'absteigend',
        },
        auth: {
            auth_check_error: 'Bitte verbinden Sie sich um fortzufahren',
            user_menu: 'Profil',
            username: 'Nutzername',
            password: 'Passwort',
            sign_in: 'Anmelden',
            sign_in_error: 'Fehler bei der Anmeldung',
            logout: 'Abmelden',
        },
        notification: {
            updated: 'Element wurde aktualisiert |||| %{smart_count} Elemente wurden aktualisiert',
            created: 'Element wurde erstellt',
            deleted: 'Element wurde gelöscht |||| %{smart_count} Elemente wurden gelöscht',
            bad_item: 'Fehlerhaftes Element',
            item_doesnt_exist: 'Das Element existiert nicht',
            http_error: 'Fehler beim Kommunizieren mit dem Server',
            data_provider_error: 'Fehler im dataProvider. Prüfe die Konsole für Details.',
            i18n_error: 'Die Übersetzungen für die angegebene Sprache können nicht geladen werden.',
            canceled: 'Aktion abgebrochen',
            logged_out: 'Ihre Sitzung wurde beendet, bitte verbinden Sie sich neu.',
        },
        validation: {
            required: 'Benötigt',
            minLength: 'Muss mindestens %{min} Zeichen lang sein',
            maxLength: 'Darf maximal %{max} Zeichen lang sein',
            minValue: 'Muss mindestens %{min} sein',
            maxValue: 'Muss %{max} oder weniger sein',
            number: 'Muss eine Nummer sein',
            email: 'Muss eine gültige E-Mail sein',
            oneOf: 'Es muss einer sein von: %{options}',
            regex: 'Es muss folgendem regulären Ausdruck entsprechen: %{pattern}',
        },
    },
};

export default germanMessages;
