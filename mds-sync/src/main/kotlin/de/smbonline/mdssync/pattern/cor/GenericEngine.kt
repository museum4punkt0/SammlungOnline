package de.smbonline.mdssync.pattern.cor

import kotlin.reflect.KClass

class GenericEngine(val clazz: KClass<*>, val command: (element: Any) -> Unit) : Engine<GenericElement>() {

    override fun isResponsible(element: GenericElement): Boolean {
        return element::class.qualifiedName == clazz.qualifiedName
    }

    override fun executeCommand(element: GenericElement) {
        command(element)
    }

}
