package de.smbonline.mdssync.pattern.cor

class ChainOfResponsibilityBuilder<T : Processable> {

    private val engineCollections: ArrayList<Engine<T>> = ArrayList()

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

        fun <T : Processable> build(vararg engine: Engine<T>): Engine<T> {
            return build(engine.toList() as ArrayList<Engine<T>>)
        }

        fun <T : Processable> build(collection: ArrayList<Engine<T>>): Engine<T> {
            for (i in collection.indices) {
                if (i + 1 < collection.size) {
                    collection[i].nextCommand = collection[i + 1]
                }
            }
            return collection[0]
        }
    }
}
