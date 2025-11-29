import os
from serpapi import GoogleSearch
from typing import List

class SearchService:
    def __init__(self):
        # Lee la API Key de la variable de entorno
        self.api_key = os.environ.get("SERPAPI_API_KEY")
        if not self.api_key:
            print("WARNING: SERPAPI_API_KEY no está configurada. La búsqueda no estará disponible.")

    def search(self, query: str, num_results: int = 3) -> str:
        # Verifica si hay API key antes de intentar buscar
        if not self.api_key:
            return "La funcionalidad de búsqueda no está disponible en este momento."
        
        params = {
            "api_key": self.api_key,
            "engine": "google",
            "q": query,
            "location": "Colombia", # Puedes ajustar esto si necesitas otra localización
            "num": num_results
        }
        
        try:
            search = GoogleSearch(params)
            results = search.get_dict()
            
            output = []
            
            # 1. Resultados orgánicos (enlaces web)
            if "organic_results" in results:
                for res in results["organic_results"]:
                    # Limitamos la información para mantenerla concisa para el LLM
                    output.append(f"{res.get('title', 'N/A')}: {res.get('snippet', 'N/A')} ({res.get('link', 'N/A')})")
            
            # 2. Respuestas destacadas (Knowledge Graph o Answer Box)
            if "answer_box" in results and "snippet" in results["answer_box"]:
                output.insert(0, f"Respuesta Destacada: {results['answer_box']['snippet']}")
            elif "knowledge_graph" in results and "description" in results["knowledge_graph"]:
                output.insert(0, f"Gráfico de Conocimiento: {results['knowledge_graph']['description']}")
                
            if not output:
                return "No se encontraron resultados de búsqueda relevantes."
            
            return "\n".join(output)
            
        except Exception as e:
            # Capturará errores de red o de API Key inválida
            return f"Error al realizar la búsqueda con SerpApi: {str(e)}"
