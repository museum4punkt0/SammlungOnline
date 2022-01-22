package de.smbonline.searchindexer.norm;

import de.smbonline.searchindexer.dto.Data;

import java.util.Map;
import java.util.function.Function;

@FunctionalInterface
public interface ItemSort extends Function<Map<String, Data>, Data[]> {
}
