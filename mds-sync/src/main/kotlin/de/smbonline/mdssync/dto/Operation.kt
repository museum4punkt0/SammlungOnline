package de.smbonline.mdssync.dto

enum class Operation {

    DELETE,
    UPSERT,
    // TODO implement PATCH: for Object this means only Attributes, not Object itself (used for additional languages)
    //  for Highlights it could be "add if not yet added - but no deletions"
    //  for Images UPSERT and PATCH is probably the same as long as we cannot handle negative lists there

}