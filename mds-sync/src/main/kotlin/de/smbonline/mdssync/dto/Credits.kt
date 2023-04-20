package de.smbonline.mdssync.dto

class Credits {

    lateinit var owner: String
    lateinit var licenseKey: String

    var collection: String? = null
    var title: String? = null
    var originDate: String? = null
    var photographer: String? = null
    var artist: String? = null
    var additionalCredits: String? = null
}