from django.apps import AppConfig

from django.apps import AppConfig

class BooksConfig(AppConfig):
    name = 'books'

    def ready(self):
        from .vector_store import rebuild_faiss_index
        rebuild_faiss_index()



