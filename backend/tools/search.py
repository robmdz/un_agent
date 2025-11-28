from googlesearch import search
from typing import List

class SearchService:
    def search(self, query: str, num_results: int = 3) -> str:
        try:
            results = []
            for result in search(query, num_results=num_results, advanced=True):
                results.append(f"{result.title}: {result.description} ({result.url})")
            
            if not results:
                return "No results found."
            
            return "\n".join(results)
        except Exception as e:
            return f"Error performing search: {str(e)}"
