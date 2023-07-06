package de.smbonline.searchindexer.conf

import de.smbonline.searchindexer.norm.NormalizerRegistry
import de.smbonline.searchindexer.norm.impl.*
import de.smbonline.searchindexer.service.GraphQlService
import org.springframework.beans.factory.ObjectProvider
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class NormalizerConfigurer {

    @Bean
    fun initConverterRegistry(props: NormalizerConfig, graphQl: ObjectProvider<GraphQlService>): NormalizerRegistry {
        return NormalizerRegistry()
                .register(AcquisitionNormalizer())
                .register(ArchiveContentNormalizer())
                .register(AssetsNormalizer(graphQl))
                .register(AssortmentsNormalizer(graphQl))
                .register(AttachmentsNormalizer())
                .register(CollectionNormalizer(graphQl))
                .register(CollectionKeyNormalizer())
                .register(CompilationNormalizer(graphQl))
                .register(CreditLineNormalizer())
                .register(CulturalReferenceNormalizer(graphQl))
                .register(DateRangeNormalizer())
                .register(DatingNormalizer())
                .register(DescriptionNormalizer())
                .register(DimensionsAndWeightNormalizer())
                .register(exhibitNormalizer(props))
                .register(ExhibitionsNormalizer())
                .register(ExhibitionSpaceNormalizer(graphQl, props.locationSeparator)) // TODO use ExhibitionSpaceNormalizer2 instead when locationVocs are filled in MDS
                .register(FindSpotNormalizer())
                .register(GeographicalReferenceNormalizer(graphQl))
                .register(HighlightsNormalizer())
                .register(IconclassNormalizer())
                .register(IconographyNormalizer())
                .register(IdNormalizer())
                .register(IdentNumberNormalizer())
                .register(InscriptionNormalizer())
                .register(InvolvedPartiesNormalizer(graphQl))
                .register(KeywordNormalizer())
                .register(LiteratureNormalizer())
                .register(LocationNormalizer(graphQl, props.locationSeparator)) // TODO use LocationNormalizer2 instead when locationVocs are filled in MDS
                .register(MaterialAndTechniqueNormalizer(graphQl))
                .register(ProvenanceNormalizer())
                .register(ProvenanceEvaluationNormalizer())
                .register(SignatureNormalizer())
                .register(TechnicalTermNormalizer())
                .register(TitleNormalizer())
                .register(TitlesNormalizer())
    }

    private fun exhibitNormalizer(props: NormalizerConfig): ExhibitNormalizer {
        val normalizer = ExhibitNormalizer()
        normalizer.unknownExhibitionSpace = props.unknownExhibitionSpace
        return normalizer
    }
}