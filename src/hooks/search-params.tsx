import { parseAsFloat, parseAsString, createLoader } from "nuqs/server";

export const coordinatesSearchParams = {
  latitude: parseAsFloat.withDefault(0),
  longitude: parseAsFloat.withDefault(0),
  branchId: parseAsString.withDefault(""),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);
