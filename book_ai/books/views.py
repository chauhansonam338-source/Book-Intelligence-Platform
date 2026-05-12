from django.shortcuts import render
from .models import Book
from .serializers import BookSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .vector_store import faiss_store, faiss_search
from .llm import generate_answer, generate_summary, generate_genre
from .scraper import run_scraper

from django.http import JsonResponse
import threading
from .services import generate_ai_fields

query_cache = {}
def test_api(request):
    return JsonResponse({"message": "Books API working"})



@api_view(['GET', 'POST'])
def get_books(request):
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = BookSerializer(data = request.data)

        if serializer.is_valid():
            book = serializer.save()
            faiss_store(book)
            generate_ai_fields(book)

            
            book.refresh_from_db()
            return Response(BookSerializer(book).data, status=201)
            
        
        return Response(serializer.errors)
    
@api_view(['GET'])
def get_book_detail(request, id):
    try:
        book = Book.objects.get(id = id)
    except Book.DoesNotExist:
        return Response({'error' : 'Book not found'}, status= 404)

    serializer = BookSerializer(book, many = False)
    return Response(serializer.data)

    
@api_view(['GET'])
def recommend_books(request, id):
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=404)


    similar_books = faiss_search(book.description, k=6)
    filtered_books = []
    for b in similar_books:
        if b.id != book.id:
            filtered_books.append({
                "id": b.id,
                "title": b.title,
                "author": b.author,
                "rating": b.rating,
                "reason": f"Similar themes to '{book.title}' based on content"
            })

    return Response(filtered_books[:5])

@api_view(['POST'])
def query_books(request):
    question = request.data.get('question')

    if not question:
        return Response({'error': 'Question not found'}, status=400)

    if question in query_cache:
        return Response(query_cache[question])

    books = faiss_search(question, k=5)

    context = ""
    for book in books:
        context += f"Title: {book.title}\nDescription: {book.description}\n\n"

    answer = generate_answer(context, question)

    sources = [
        {
            "title": book.title,
            "description": book.description[:100]
        }
        for book in books
    ]

    response_data = {
        "answer": answer,
        "sources": sources
    }

    query_cache[question] = response_data

    return Response(response_data)

@api_view(['POST'])
def run_scraper_api(request):
    threading.Thread(target=run_scraper, daemon=True).start()

    return Response({"message": "Scraper started"})
        




    
    

