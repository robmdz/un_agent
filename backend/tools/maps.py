import os
import googlemaps
from typing import Dict, Any

class MapsService:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_MAPS_API_KEY")
        self.client = None
        if self.api_key:
            self.client = googlemaps.Client(key=self.api_key)

    def find_place(self, query: str) -> str:
        if not self.client:
            return "Google Maps API key not configured."
        
        try:
            results = self.client.places(query)
            if results['status'] == 'OK' and results['results']:
                place = results['results'][0]
                name = place.get('name')
                address = place.get('formatted_address')
                return f"Found {name} at {address}."
            return "No places found."
        except Exception as e:
            return f"Error finding place: {str(e)}"

    def get_directions(self, origin: str, destination: str) -> str:
        if not self.client:
            return "Google Maps API key not configured."
        
        try:
            directions = self.client.directions(origin, destination)
            if directions:
                route = directions[0]['legs'][0]
                duration = route['duration']['text']
                distance = route['distance']['text']
                start = route['start_address']
                end = route['end_address']
                return f"Directions from {start} to {end}: {distance}, {duration}."
            return "No directions found."
        except Exception as e:
            return f"Error getting directions: {str(e)}"
