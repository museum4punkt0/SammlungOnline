package de.smbonline.mdssync.dto

class ThesaurusTranslation(val thesaurus: ThesaurusExt) : Thesaurus(thesaurus.mdsId, thesaurus.type) {
    lateinit var value: String
    lateinit var language: String

    init {
        instance = thesaurus.instance
        name = thesaurus.name
    }
}