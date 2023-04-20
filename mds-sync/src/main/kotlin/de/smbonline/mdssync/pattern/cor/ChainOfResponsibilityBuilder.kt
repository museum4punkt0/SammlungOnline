package de.smbonline.mdssync.pattern.cor

class ChainOfResponsibilityBuilder<T : Processable> {

    private val engineCollections: MutableList<Engine<T>> = mutableListOf()

    fun add(element: Engine<T>) {
        engineCollections.add(element)
    }

    fun addAll(elements: Collection<Engine<T>>) {
        engineCollections.addAll(elements)
    }

    fun build(): Engine<T> {
        return build(engineCollections)
    }

    companion object {

        fun <T : Processable> build(vararg processors: Engine<T>): Engine<T> {
            return build(processors.toList())
        }

        fun <T : Processable> build(processors: List<Engine<T>>): Engine<T> {
            for (i in processors.indices) {
                if (i + 1 < processors.size) {
                    processors[i].nextCommand = processors[i + 1]
                }
            }
            return processors[0]
        }
    }
}
