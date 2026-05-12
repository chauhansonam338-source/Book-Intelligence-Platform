import faiss
import numpy as np
from .embeddings import get_embedding
from .models import Book

dimension = 384  
index = faiss.IndexFlatL2(dimension)

book_mapping = {}

def faiss_store(book):
    embeddings = get_embedding(book.description)
    vector = np.array([embeddings]).astype('float32')

    index.add(vector)
    current_id = index.ntotal - 1
    book_mapping[current_id] = book

def faiss_search(question, k):
    embeddings = get_embedding(question)
    vector = np.array([embeddings]).astype('float32')
    distances, indices = index.search(vector, k)
    books = [book_mapping[i] for i in indices[0] if i != -1]

    if not books:
        return []

    return books  



def rebuild_faiss_index():
    global index, book_mapping

    index.reset()
    book_mapping.clear()

    books = Book.objects.all()

    for book in books:
        if book.description:
            embeddings = get_embedding(book.description)
            vector = np.array([embeddings]).astype('float32')
            index.add(vector)
            current_id = index.ntotal - 1
            book_mapping[current_id] = book
