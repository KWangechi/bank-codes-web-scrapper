import { useEffect } from "react";

export default function Map({ setFormData }) {
  useEffect(() => {
    let marker;

    async function initMap() {
      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } =
        await window.google.maps.importLibrary("marker");

      const map = new Map(document.getElementById("map"), {
        center: { lat: 1.0068607, lng: 37.847844 },
        zoom: 5,
        mapId: "DEMO_MAP_ID",
      });

      marker = new AdvancedMarkerElement({
        map,
        position: { lat: 1.0068607, lng: 37.847844 },
        gmpDraggable: true,
      });

      marker.addListener("dragend", () => {
        const { lat, lng } = marker.position;

        setFormData((prev) => ({
          ...prev,
          coordinates: { lat, lng },
        }));
      });
    }

    initMap();

    return () => {
      if (marker) {
        marker.map = null;
      }
    };
  }, [setFormData]);

  return <div id="map" style={{ height: "300px" }} />;
}
