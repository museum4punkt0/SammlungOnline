package de.smbonline.mdssync.dto

open class ThesaurusExt(override val mdsId: Long, override val type: String) : Thesaurus(mdsId, type) {
    var parent: ThesaurusExt? = null

    private fun getParentHierarchy(): String? {
        return if (parent == null) null
        else {
            val parents = parent?.getParentHierarchy()
            if (parents == null) parent?.name else "${parent?.name} -> $parents"
        }
    }

    override fun toString(): String {
        val parents = getParentHierarchy()
        return if (parents == null) super.toString() else "$instance{id:$mdsId, name:$name, parents:$parents}"
    }
}