import * as prismicT from "@prismicio/types";
import * as faker from "faker";

export const geoPoint = (): prismicT.GeoPointField => {
	const gps = faker.address.nearbyGPSCoordinate();

	return {
		longitude: Number.parseFloat(gps[0]),
		latitude: Number.parseFloat(gps[1]),
	};
};
