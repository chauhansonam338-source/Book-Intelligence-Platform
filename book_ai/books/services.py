
from .llm import generate_summary, generate_genre

def generate_ai_fields(book):
    try:
        context_sm = f"Summarize the following book in 3-4 lines:\n\nTitle: {book.title}\nDescription: {book.description}"
        context_gn = f"Classify the genre of this book in ONE word.\nReturn ONLY the genre name.\n\nTitle: {book.title}\nDescription: {book.description}"

        summary = generate_summary(context_sm)
        genre = generate_genre(context_gn)

    except Exception as e:
        print("[AI ERROR]", e)
        summary = "Summary not available"
        genre = "Unknown"

    book.summary = summary
    book.genre = genre
    book.save()