package de.smbonline.mdssync.dataprocessor.service

interface DataService<T> {

    fun save(element: T)
    fun delete(element: T)

}
