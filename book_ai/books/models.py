from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length = 100)
    description = models.TextField()
    rating = models.FloatField()
    book_url = models.URLField()
    summary = models.TextField(blank=True, null=True)
    genre = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


