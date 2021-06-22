package de.smbonline.searchindexer.conf

import de.smbonline.searchindexer.norm.NormalizerRegistry
import de.smbonline.searchindexer.norm.impl.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class NormalizerConfigurer @Autowired constructor(val props: NormalizerConfig) {

    @Bean
    fun initConverterRegistry(): NormalizerRegistry {
        return NormalizerRegistry()
                .register(AttachmentsNormalizer())
                .register(CollectionNormalizer())
                .register(CollectionKeyNormalizer())
                .register(CompilationNormalizer())
                .register(CreditLineNormalizer())
                .register(DateRangeNormalizer())
                .register(DatingNormalizer())
                .register(DimensionsAndWeightNormalizer())
                .register(exhibitNormalizer())
                .register(ExhibitionSpaceNormalizer(props.locationSeparator))
                .register(GeographicalReferenceNormalizer())
                .register(HighlightsNormalizer())
                .register(IdNormalizer())
                .register(IdentNumberNormalizer())
                .register(InvolvedPartiesNormalizer(props.involvedPartiesWithExplicitRole))
                .register(LiteratureNormalizer())
                .register(LocationNormalizer(props.locationSeparator))
                .register(LongDescriptionNormalizer())
                .register(MaterialAndTechniqueNormalizer())
                .register(ProvenanceNormalizer())
                .register(SignatureNormalizer())
                .register(TechnicalTermNormalizer())
                .register(TitlesNormalizer())
    }

    private fun exhibitNormalizer(): ExhibitNormalizer {
        val normalizer = ExhibitNormalizer()
        normalizer.unknownExhibitionSpace = props.unknownExhibitionSpace
        return normalizer
    }
}